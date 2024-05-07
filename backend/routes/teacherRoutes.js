import express from "express";
import { Teacher } from "../models/teacherModel.js";

const router = express.Router();

// Create a new teacher
router.post("/", async (req, res) => {
  try {
    const { name, subject, age, phone, address, qualification } = req.body;
    const teacher = new Teacher({
      name,
      subject,
      age,
      phone,
      address,
      qualification,
    });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get all teachers
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ count: teachers.length, data: teachers });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get a single teacher by ID
router.get("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Update a teacher by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, subject, age, phoneNo, address, qualification } = req.body;
    const updatedTeacher = {
      name,
      subject,
      age,
      phoneNo,
      address,
      qualification,
    };
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      updatedTeacher,
      { new: true }
    );
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Delete a teacher by ID
router.delete("/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
