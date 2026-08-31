import { Router } from "express";
import { db } from "../../services/mongodb.js";
import { validate } from "../../middleware/validateRequest.js";
import { signupSchema } from "../../types/userSchema.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/signup", validate(signupSchema), async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const users = db.collection("users");

    const ExistingUser = await users.findOne({ email });
    if (ExistingUser) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const HashPassword = await bcrypt.hash(password, 10);

    await users.insertOne({
      name,
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
