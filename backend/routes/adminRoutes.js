import express from "express";
import bcrypt from "bcryptjs";
import { Admin } from "../models/adminModel.js";

const router = express.Router();

router.post("/adminLogin", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    res.status(200).json({ message: "Login successful", admin });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Route to create a new admin
router.post("/createAdmin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res
      .status(201)
      .json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Error creating admin", error });
  }
});

export default router;
