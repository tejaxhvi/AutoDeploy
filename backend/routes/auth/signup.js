import { Router } from "express";
import { ConnectDB } from "../../services/mongodb.js";
import { validate } from "../../middleware/validateRequest.js";
import { signupSchema } from "../../types/userSchema.js";
import bcrypt from 'bcrypt'

const router = Router();

router.post("/signup", validate(signupSchema), async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Database Configuration
    const db = await ConnectDB();
    const users = db.collection("users");

    const ExistingUser = await users.findOne({ email });
    if (ExistingUser) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const HashPassword = await bcrypt.hash(password, 10);

    // Save User to Mongo Database
    await users.insertOne({
      username,
      email,
      password: HashPassword,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Account created successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
