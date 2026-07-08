import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ConnectDB } from "../../services/mongodb.js";
import { validate } from "../../middleware/validateRequest.js";
import { signinSchema } from "../../types/userSchema.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const router = Router();

router.post("/signin", validate(signinSchema), async (req, res) => {
  try {

    const { email, password } = req.body;

    // Database Configuration
    const db = await ConnectDB();
    const users = db.collection("users");

    const ExistingUser = await users.findOne({ email });

    if (ExistingUser) {

      if (await bcrypt.compare(password, ExistingUser.password)) {
        console.log("Found User", ExistingUser)

        const token = jwt.sign(
          { email: ExistingUser.email, password: ExistingUser.password },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        // ExistingUser.token = token;

        return res.status(200).json({
          message: "Sign-In Successful !",
          token: token,
        });
      } else {
        res.status(403).json({
          message: "Invalid Password."
        })
      }

    } else {
      res.status(403).send({
        message: "User not Found !",
      });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error !", error: err })
  }

});

export default router;
