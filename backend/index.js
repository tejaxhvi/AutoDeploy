import express from "express";
import cors from "cors";
import banna from "../backend/routes/auth/signin.js";
import signup from "../backend/routes/auth/signup.js";

const app = express();
app.use(cors());
app.use(express.json()); // needed to read req.body from fetch/axios

const PORT = process.env.PORT ?? 3000;

app.use("/", banna);
app.use("/", signup);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
