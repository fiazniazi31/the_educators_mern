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
//     } = req.body;

//     // Create a new user
//     const user = new User({ username, password, type: "teacher" });
//     await user.save();

//     // Create a new teacher with the user ID
//     const teacher = new Teacher({
//       name,
//       subject,
//       age,
//       phone,
//       address,
//       qualification,
//       username,
//       password,
//       user: user._id,
//     });
//     await teacher.save();

//     res.status(201).json(teacher);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });
// Create a new teacher
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
//     } = req.body;

//     // Create a new user
//     const user = new User({ username, type: "teacher" });
//     await user.hash(password); // Hash the password
//     const savedUser = await user.save();

//     // Create a new teacher with the user ID
//     const teacher = new Teacher({
//       name,
//       subject,
//       age,
//       phone,
//       address,
//       qualification,
//       user: savedUser._id,
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

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create the new User
    const newUser = new User({
      username,
      password,
      type: "teacher",
    });

    // Save the User
    await newUser.save();

    // Create the Teacher
    const newTeacher = new Teacher({
      name,
      subject,
      age,
      phone,
      address,
      qualification,
      user: newUser._id, // Reference the user
    });

    // Save the Teacher
    await newTeacher.save();

    res.status(201).json(newTeacher);
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
// router.put("/:id", async (req, res) => {
//   try {
//     const {
//       name,
//       subject,
//       age,
//       phoneNo,
//       address,
//       qualification,
//       username,
//       password,
//     } = req.body;
//     const updatedTeacher = {
//       name,
//       subject,
//       age,
//       phoneNo,
//       address,
//       qualification,
//       username,
//       password,
//     };
//     const teacher = await Teacher.findByIdAndUpdate(
//       req.params.id,
//       updatedTeacher,
//       { new: true }
//     );
//     if (!teacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }
//     res.status(200).json(teacher);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });

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

// // Delete a teacher by ID
// router.delete("/:id", async (req, res) => {
//   try {
//     const teacher = await Teacher.findByIdAndDelete(req.params.id);
//     if (!teacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }
//     res.status(200).json({ message: "Teacher deleted successfully" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });

// Route to delete a teacher
// router.delete("/:id", async (request, response) => {
//   try {
//     const { id } = request.params;

//     const teacher = await Teacher.findById(id);
//     if (!teacher) {
//       return response.status(404).json({ message: "Teacher not found" });
//     }

//     // Find the user associated with the teacher
//     const user = await User.findOne({ _id: teacher.user });

//     // Delete the teacher and the associated user
//     await Promise.all([
//       Teacher.findByIdAndDelete(id),
//       user ? User.findByIdAndDelete(user._id) : null,
//     ]);

//     return response
//       .status(200)
//       .json({ message: "Teacher deleted successfully" });
//   } catch (error) {
//     console.error(error.message);
//     return response.status(500).json({ message: "Server error" });
//   }
// });

// Route to delete a teacher
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return response.status(404).json({ message: "Teacher not found" });
    }

    // Find the user associated with the teacher
    const user = await User.findOne({ _id: teacher.user });

    // Delete the teacher and the associated user
    await Promise.all([
      Teacher.findByIdAndDelete(id),
      user ? User.findByIdAndDelete(user._id) : null,
    ]);

    return response
      .status(200)
      .json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
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
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const teacher = await User.findOne({ username, password });
//   if (teacher) {
//     res.status(200).json({ message: "Login successful", teacher });
//   } else {
//     res.status(401).json({ message: "Invalid username or password" });
//   }
// });
// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, type: "teacher" });
    if (user) {
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        res.status(200).json({
          message: "Login successful",
          userId: user._id,
          userType: user.type,
        });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// // Mark attendance for a teacher
// router.post("/:teacherId/attendance", async (req, res) => {
//   try {
//     const teacherId = req.params.teacherId;
//     const { type, date } = req.body;

//     // Find the teacher by teacherId
//     const teacher = await Teacher.findById(teacherId);

//     if (!teacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }

//     // Update the teacher's attendance record
//     teacher.attendance.push({ type, date });
//     await teacher.save();

//     res.status(200).json({ message: "Attendance marked successfully" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server Error");
//   }
// });

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

    const currentDate = new Date(date);
    const lastAttendanceRecord = teacher.attendance.slice(-1)[0];

    if (lastAttendanceRecord) {
      const lastAttendanceDate = new Date(lastAttendanceRecord.date);
      const timeDiff = currentDate - lastAttendanceDate;
      const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds

      if (timeDiff < fiveMinutes) {
        if (lastAttendanceRecord.type === "in" && type === "in") {
          return res.status(400).json({
            message:
              "Your attendance for IN is already marked. Try for OUT after 5 minutes.",
          });
        } else if (lastAttendanceRecord.type === "in" && type === "out") {
          return res.status(400).json({
            message: "Please try again after 5 minutes to mark OUT attendance.",
          });
        } else if (lastAttendanceRecord.type === "out" && type === "in") {
          return res.status(400).json({
            message: "Please try again after 5 minutes to mark IN attendance.",
          });
        } else if (lastAttendanceRecord.type === "out" && type === "out") {
          return res.status(400).json({
            message:
              "Your attendance for OUT is already marked. Try for IN after 5 minutes.",
          });
        }
      }
    }

    // Update the teacher's attendance record
    teacher.attendance.push({ type, date: currentDate });
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
