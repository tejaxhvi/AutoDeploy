import { Router } from "express";
import ValidateRequest from "../middleware/auth.controller.js";
import { db } from "../services/mongodb.js";

const user = Router();

// Returns the profile of the user identified by the Bearer token.
// The response is the user object itself (flat), which the frontend
// stores directly in AuthContext as `user`.
user.get("/user", ValidateRequest, async (req, res) => {
  try {
    const email = req.user; // set by ValidateRequest

    const profile = await db
      .collection("users")
      .findOne({ email }, { projection: { name: 1, email: 1, createdAt: 1 } });

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      id: profile._id,
      name: profile.name,
      email: profile.email,
      createdAt: profile.createdAt,
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return res.status(500).json({
      message: "Error fetching user information",
      error: err.message,
    });
  }
});

export default user;
