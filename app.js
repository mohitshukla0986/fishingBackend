import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "node:http";
import authRoutes from "./controller.js";

const app = express();
dotenv.config();

// Middleware

app.use(express.json()); // VERY IMPORTANT
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
console.log(process.env.FRONTEND_URL);


// DB connection
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.log("❌ MongoDB connection Failed", error);
    process.exit(1);
  }
};

// Routes
app.use("/api/auth", authRoutes);

const server = createServer(app);

// Start server after DB connection
dbConnection()
  .then(() => {
    server.listen(process.env.PORT, () => {
      console.log(`🤖 Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Failed to connect DB", err);
  });