import { Router } from "express";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { upload } from "../middleware/upload.js";
import { db } from "../services/mongodb.js";
import { BUCKET_NAME, S3 } from "../services/database.js";
import { randomUUID } from "crypto";
import path from "path";
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

    const deployementId = randomUUID().slice(0, 8);
    const prefix = `deployments/${deployementId}/`;

    const items = req.files.map((file) => ({
      file,
      key: prefix + path.basename(file.originalname),
    }));

    try {
      await Promise.all(
        items.map(({ file, key }) => {
          S3.send(
            new PutObjectCommand({
              Bucket: BUCKET_NAME,
              Key: key,
              Body: file.buffer,
              ContentType: file.mimetype,
            }),
          );
        }),
      );

      // Save file details to database.
      await db.collection("data").insertOne({
        user: req.user,
        deployementId,
        files: items.map((i) => i.key),
        createdAt: new Date(),
      });

      return res.status(201).json({
        message: "Files uploaded successfully",
        deployementId,
        files: req.files.map((f) => ({
          filename: f.originalname,
          mimetype: f.mimetype,
          size: f.size,
        })),
      });
    } catch (err) {
      console.error(err);
      return res.status(400).json({
        message: "Upload Unsuccessful !",
      });
    }
  },
);

export default router;
