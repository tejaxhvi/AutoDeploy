import express from "express";
import cors from "cors";
import env from "./config/env.js";
import SignIn from "./routes/auth/signin.js";
import SignUp from "./routes/auth/signup.js";
import router from "./routes/uploads.routes.js"

const app = express();
app.use(cors());
app.use(express.json()); // needed to read req.body from fetch/axios

const PORT = process.env.PORT ?? 3001;

app.use("/api", SignIn);
app.use("/api", SignUp);
app.use("/api", router);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  console.error("Route not found:", req.method, req.path);
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection in Promise:', err);
  // Don't exit, let the app continue running
});
