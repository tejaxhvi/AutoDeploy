import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { db } from "../services/mongodb.js";
import { uploadObject } from "../services/database.js";
import { randomUUID } from "crypto";
import path from "path";
import ValidateRequest from "../middleware/auth.controller.js";
import { publishToDisk } from "../services/publisher.js";

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

    const deploymentId = randomUUID().slice(0, 8);
    const prefix = `deployments/${deploymentId}/`;

    const items = req.files.map((file) => ({
      file,
      key: prefix + path.basename(file.originalname),
    }));

    try {
      await Promise.all(
        items.map(({ file, key }) =>
          uploadObject({
            key,
            body: file.buffer,
            contentType: file.mimetype,
          }),
        ),
      );

      await publishToDisk({ deploymentId, files: req.files });

      // Save file details to database.
      await db.collection("data").insertOne({
        user: req.user,
        deploymentId,
        files: items.map((i) => i.key),
        createdAt: new Date(),
      });

      return res.status(201).json({
        message: "Files uploaded successfully",
        deploymentId,
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
