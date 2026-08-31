import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { db } from "../../services/mongodb.js";
import { validate } from "../../middleware/validateRequest.js";
import { signinSchema } from "../../types/userSchema.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const router = Router();

router.post("/signin", validate(signinSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);
    if (!db) {
      return res.status(500).json({ message: "Database connection failed" });
    }

    const users = db.collection("users");

    const ExistingUser = await users.findOne({ email });

    if (ExistingUser) {
      if (await bcrypt.compare(password, ExistingUser.password)) {
        const token = jwt.sign({ email: ExistingUser.email }, JWT_SECRET, {
          expiresIn: "7d",
        });

        return res.status(200).json({
          message: "Sign-In Successful !",
          token: token,
        });
      } else {
        res.status(403).json({
          message: "Invalid Email or Password.",
        });
      }
    } else {
      res.status(403).json({
        message: "User not Found !",
      });
    }
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({
      message: "Internal Server Error !",
      error: err.message || err.toString(),
    });
  }
});

export default router;
