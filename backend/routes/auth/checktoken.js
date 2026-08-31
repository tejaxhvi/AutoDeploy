import dotenv from "dotenv";
import { Router } from "express";
import jwt from "jsonwebtoken";
import { db } from "../../services/mongodb.js";

const checkToken = Router();

const JWT_SECRET = process.env.JWT_SECRET;

checkToken.get("/user", async (req, res) => {
  const authHeader = String(req.headers.authorization);

  if (!authHeader || !authHeader?.startsWith("Bearer")) {
    return res.status(401).json({
      message: "No token Provided !",
    });
  }

  const token = authHeader.split(" ")[1];

  const isValid = jwt.verify(token, JWT_SECRET);
  const email = isValid.email;

  const users = db.collection("users");

  const ExistingUser = await users.findOne({ email });

  if (!ExistingUser) {
    res.status(401).json({
      message: "User not Found !",
    });
  }

  return res.status(200).json({
    data: {
      email: ExistingUser.email,
      name: ExistingUser.username,
    },
  });
});

export default checkToken;
