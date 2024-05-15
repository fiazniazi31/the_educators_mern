import express from "express";
import { Teacher } from "../models/teacherModel.js";
import { User } from "../models/usersModel.js";

const router = express.Router();

// // Create a new teacher
// router.post("/", async (req, res) => {
//   try {
//     const {
//       name,
//       subject,
//       age,
//       phone,
//       address,
//       qualification,
//       username,
//       password,
//       type,
//     } = req.body;
//     const teacher = new Teacher({
//       name,
//       subject,
//       age,
//       phone,
//       address,
//       qualification,
//       username,
//       password,
//       type,
//     });
//     await teacher.save();
//     res.status(201).json(teacher);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });
// Create a new teacher
router.post("/", async (req, res) => {
  try {
    const {
      name,
      subject,
      age,
      phone,
      address,
      qualification,
      username,
      password,
    } = req.body;

    // Create a new user
    const user = new User({ username, password, type: "teacher" });
    await user.save();

    // Create a new teacher with the user ID
    const teacher = new Teacher({
      name,
      subject,
      age,
      phone,
      address,
      qualification,
      username,
      password,
      user: user._id,
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
    const {
      name,
      subject,
      age,
      phoneNo,
      address,
      qualification,
      username,
      password,
    } = req.body;
    const updatedTeacher = {
      name,
      subject,
      age,
      phoneNo,
      address,
      qualification,
      username,
      password,
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

// // login
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const teacher = await Teacher.findOne({ username, password });
//   if (teacher) {
//     res.status(200).json({ message: "Login successful", teacher });
//   } else {
//     res.status(401).json({ message: "Invalid username or password" });
//   }
// });

// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const teacher = await User.findOne({ username, password });
  if (teacher) {
    res.status(200).json({ message: "Login successful", teacher });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

// Mark attendance for a teacher
router.post("/:teacherId/attendance", async (req, res) => {
  try {
    const teacherId = req.params.teacherId;
    const { type, date } = req.body;

    // Find the teacher by teacherId
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // Update the teacher's attendance record
    teacher.attendance.push({ type, date });
    await teacher.save();

    res.status(200).json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get teacher details by userId
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const teacher = await Teacher.findOne({ user: userId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(teacher);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

export default router;
