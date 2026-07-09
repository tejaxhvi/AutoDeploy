import express from "express";
import cors from "cors";
import env from "./config/env.js";
import banna from "./routes/auth/signin.js";
import signup from "./routes/auth/signup.js";

const app = express();
app.use(cors());
app.use(express.json()); // needed to read req.body from fetch/axios

const PORT = process.env.PORT ?? 3001;

// Mount routes with /api prefix to match frontend calls
app.use("/api", banna);
app.use("/api", signup);

// Global error handler
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
