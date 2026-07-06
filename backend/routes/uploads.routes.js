import { Router } from "express";
import { upload } from "../middleware/upload";

const router = Router()

router.get("/upload", upload.array("files", 2), async (req, res) => {

  if (!req.files || req.files.length == 0) {
    res.status(400)
      .json({
        error: "Files are not Uploaded !"
      })
  }
  const RequestFiles = req.files.find(f => f.mimetype == "text/html")
  if (!RequestFiles) {
    return res.status(400)
      .json({
        error: "Atleast HTML is required for deployement !"
      })
  }
  res.status(200).json()
})