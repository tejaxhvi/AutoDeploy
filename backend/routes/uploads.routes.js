import { Router } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { upload } from "../middleware/upload.js";
import { db } from "../services/mongodb.js";
import { BUCKET_NAME, S3 } from "../services/database.js";
import ValidateRequest from "../middleware/auth.controller.js";

const router = Router();

router.post("/upload", ValidateRequest, upload.array("files"), async (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        error: "Files are not Uploaded !",
      });
    }

    const ishtmlFile = req.files.find((f) => f.mimetype === "text/html");
    if (!ishtmlFile) {
      return res.status(400).json({
        message: "Atleast HTML is required for deployement !",
      });
  }

    try {
      const uploadPromises = req.files.map((file) => {
        const Filekey = `uploads/${Date.now()}-${file.originalname}`;

        const command = new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: Filekey,
          Body: file.buffer,
          ContentType: file.mimetype,
        });

        return { Filekey, command };
      });

      const uploadedFiles = await Promise.all(
        uploadPromises.map(({ command }) => S3.send(command)),
      );

      const StatusCode = uploadedFiles[0]["$metadata"].httpStatusCode;
      if (!StatusCode === 200) {
        return res.status(401).json({ message: "File Upload Unsuccessful!" });
      }
      return res.json({
        message: "Files uploaded successfully",
        FilesPath: uploadPromises.map((u) => u.Filekey),
        files: req.files.map((f) => ({
          filename: f.originalname,
          mimetype: f.mimetype,
          size: f.size,
        })),
      });
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Upload Unsuccessful !", error: err.message || err });
    }
  },
);

export default router;
