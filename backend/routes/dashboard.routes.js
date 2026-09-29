import { Router } from "express";
import ValidateRequest from "../middleware/auth.controller.js";
import { db } from "../services/mongodb.js";

const dashboard = Router();

dashboard.get("/dashboard", ValidateRequest, async (req, res) => {
  try {
    const user = req.user;

    const userInfo = db.collection("data").find({ user }).toArray();

    return res.status(200).json({
      message: "User Verified",
      data: userInfo,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error Fetching dashboard data",
      error: err.message,
    });
  }
});

export default dashboard;