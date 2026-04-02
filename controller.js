import express from "express";
import User from "./module.js";
import { log } from "node:console";

const router = express.Router();

// Save login data
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
console.log(username, password);

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

  

    const newUser = new User({
      username,
      password
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "Login data saved successfully",
    
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

router.post("/login", loginUser);

export default router;