import express from "express";
import bcrypt from "bcrypt";
import { Student } from "../models/studentsModel.js";
import { User } from "../models/usersModel.js";

const router = express.Router();

// Route to add a new student
// router.post("/", async (request, response) => {
//   try {
//     const {
//       name,
//       fatherName,
//       class: className,
//       subjects,
//       username,
//       password,
//       type,
//     } = request.body;

//     if (
//       !name ||
//       !fatherName ||
//       !className ||
//       !subjects ||
//       subjects.length === 0 ||
//       !username ||
//       !password ||
//       !type
//     ) {
//       return response.status(400).send({
//         message: `Send all required fields: Name, Father Name, Class, and at least one Subject`,
//       });
//     }

//     const newStudent = {
//       name,
//       fatherName,
//       class: className,
//       subjects,
//       username,
//       password,
//       type,
//     };

//     const student = await Student.create(newStudent);
//     return response.status(201).json(student); // Use 201 Created status for successful creation
//   } catch (error) {
//     console.error(error.message);
//     return response.status(500).json({ message: "Server error" });
//   }
// });
// Route to create a new student
// router.post("/", async (request, response) => {
//   try {
//     const {
//       name,
//       fatherName,
//       class: className,
//       subjects,
//       username,
//       password,
//       type,
//     } = request.body;

//     if (
//       !name ||
//       !fatherName ||
//       !className ||
//       !subjects ||
//       subjects.length === 0 ||
//       !username ||
//       !password ||
//       !type
//     ) {
//       return response.status(400).send({
//         message: `Send all required fields: Name, Father Name, Class, and at least one Subject`,
//       });
//     }

//     const newUser = new User({
//       username,
//       password,
//       type,
//     });

//     const savedUser = await newUser.save();

//     const newStudent = {
//       name,
//       fatherName,
//       class: className,
//       subjects,
//       user: savedUser._id,
//     };

//     const student = await Student.create(newStudent);
//     return response.status(201).json(student); // Use 201 Created status for successful creation
//   } catch (error) {
//     console.error(error.message);
//     return response.status(500).json({ message: "Server error" });
//   }
// });

// Route to create a new student
router.post("/", async (request, response) => {
  try {
    const {
      name,
      fatherName,
      class: className,
      subjects,
      username,
      password,
      type,
    } = request.body;

    if (
      !name ||
      !fatherName ||
      !className ||
      !subjects ||
      subjects.length === 0 ||
      !username ||
      !password ||
      !type
    ) {
      return response.status(400).send({
        message: `Send all required fields: Name, Father Name, Class, and at least one Subject`,
      });
    }

    const newUser = new User({
      username,
      password,
      type,
    });

    const savedUser = await newUser.save(); // <-- This line seems to be causing the issue

    const newStudent = {
      name,
      fatherName,
      class: className,
      subjects,
      user: savedUser._id,
    };

    const student = await Student.create(newStudent);
    return response.status(201).json(student); // Use 201 Created status for successful creation
  } catch (error) {
    console.error("Error creating student:", error);
    return response.status(500).json({ message: "Server error" });
  }
});

// Route to get all students
router.get("/", async (request, response) => {
  try {
    const students = await Student.find({});
    return response
      .status(200)
      .json({ count: students.length, data: students });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// Route to get a student by ID
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const student = await Student.findById(id);

    if (!student) {
      return response.status(404).json({ message: "Student not found" });
    }

    return response.status(200).json({
      _id: student._id,
      name: student.name,
      fatherName: student.fatherName,
      class: student.class,
      subjects: student.subjects,
      feeRecords: student.feeRecords,
      testRecords: student.testRecords,
      attendance: student.attendance,
      username: student.username,
      password: student.password,
    });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// Route to update a student
router.put("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const {
      name,
      fatherName,
      class: className,
      subjects,
      username,
      password,
    } = request.body;

    if (!name || !fatherName || !className) {
      return response.status(400).send({
        message: `Send all required fields: Name, Father Name & Class`,
      });
    }
    const updatedStudent = {
      name,
      fatherName,
      class: className,
      subjects,
      username,
      password,
    };

    const result = await Student.findByIdAndUpdate(id, updatedStudent, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({ message: "Student not found" });
    }

    return response
      .status(200)
      .json({ message: "Student updated successfully", data: result });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// // Route to delete a student
// router.delete("/:id", async (request, response) => {
//   try {
//     const { id } = request.params;
//     const result = await Student.findByIdAndDelete(id);

//     if (!result) {
//       return response.status(404).json({ message: "Student not found" });
//     }

//     return response
//       .status(200)
//       .json({ message: "Student deleted successfully" });
//   } catch (error) {
//     console.error(error.message);
//     return response.status(500).json({ message: "Server error" });
//   }
// });

// Route to delete a student
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const student = await Student.findById(id);
    if (!student) {
      return response.status(404).json({ message: "Student not found" });
    }

    // Find the user associated with the student
    const user = await User.findOne({ _id: student.user });

    // Delete the student and the associated user
    await Promise.all([
      Student.findByIdAndDelete(id),
      user ? User.findByIdAndDelete(user._id) : null,
    ]);

    return response
      .status(200)
      .json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// Route to add a test record
router.post("/:id/addTest", async (request, response) => {
  try {
    const { id } = request.params;
    const { subject, obtainMarks, totalMarks, date } = request.body; // Include test date

    if (!subject || !obtainMarks || !totalMarks || !date) {
      return response.status(400).send({
        message: `Send all required fields: Subject, Total Marks, Obtain Marks, and Date`,
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return response.status(404).json({ message: "Student not found" });
    }

    // Initialize testRecords array if it does not exist
    if (!student.testRecords) {
      student.testRecords = [];
    }

    student.testRecords.push({ subject, obtainMarks, totalMarks, date }); // Include date in test record
    await student.save();

    return response
      .status(201)
      .json({ message: "Test record added successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// Route to delete a test record
router.delete("/:id/test/:testId", async (request, response) => {
  try {
    const { id, testId } = request.params;
    const student = await Student.findById(id);

    if (!student) {
      return response.status(404).json({ message: "Student not found" });
    }

    const testRecordIndex = student.testRecords.findIndex(
      (record) => record._id.toString() === testId
    );

    if (testRecordIndex === -1) {
      return response.status(404).json({ message: "Test record not found" });
    }

    student.testRecords.splice(testRecordIndex, 1);
    await student.save();

    return response
      .status(200)
      .json({ message: "Test record deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// Route to delete all test records of a student
router.delete("/:id/test", async (request, response) => {
  try {
    const { id } = request.params;
    const student = await Student.findById(id);

    if (!student) {
      return response.status(404).json({ message: "Student not found" });
    }

    student.testRecords = []; // Remove all test records
    await student.save();

    return response
      .status(200)
      .json({ message: "All test records deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// Route to add a fee record
router.post("/:id/fee", async (request, response) => {
  try {
    const { id } = request.params;
    const { month, year, amount } = request.body;

    if (!month || !year || !amount) {
      return response.status(400).send({
        message: `Send all required fields: Month, Year, and Amount`,
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return response.status(404).json({ message: "Student not found" });
    }

    student.feeRecords.push({ month, year, amount });
    await student.save();

    return response
      .status(201)
      .json({ message: "Fee record added successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// Route to delete a fee record
router.delete("/:id/fee/:feeId", async (request, response) => {
  try {
    const { id, feeId } = request.params;
    const student = await Student.findById(id);

    if (!student) {
      return response.status(404).json({ message: "Student not found" });
    }

    const feeRecordIndex = student.feeRecords.findIndex(
      (record) => record._id.toString() === feeId
    );

    if (feeRecordIndex === -1) {
      return response.status(404).json({ message: "Fee record not found" });
    }

    student.feeRecords.splice(feeRecordIndex, 1);
    await student.save();

    return response
      .status(200)
      .json({ message: "Fee record deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// Route to get fee records for a student
router.get("/:id/fee", async (request, response) => {
  try {
    const { id } = request.params;
    const student = await Student.findById(id);

    if (!student) {
      return response.status(404).json({ message: "Student not found" });
    }

    return response.status(200).json(student.feeRecords);
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// Route to mark attendance
router.post("/:id/attendance", async (request, response) => {
  try {
    const { id } = request.params;
    const { date, present } = request.body;

    // Check if attendance is already marked for the given date
    const student = await Student.findById(id);

    if (!student) {
      return response.status(404).json({ message: "Student not found" });
    }

    const existingAttendance = student.attendance.find(
      (record) => record.date.toISOString().split("T")[0] === date
    );

    if (existingAttendance) {
      return response.status(400).json({
        message: "Attendance is already marked for this date",
      });
    }

    // Add attendance record
    student.attendance.push({ date: new Date(date), present });
    await student.save();

    return response
      .status(201)
      .json({ message: "Attendance marked successfully" });
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// Route to get attendance records for a student
router.get("/:id/attendance", async (request, response) => {
  try {
    const { id } = request.params;
    const student = await Student.findById(id);

    if (!student) {
      return response.status(404).json({ message: "Student not found" });
    }

    return response.status(200).json(student.attendance);
  } catch (error) {
    console.error(error.message);
    return response.status(500).json({ message: "Server error" });
  }
});

// login
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const user = await User.findOne({ username, password });
//     if (user) {
//       res.status(200).json({
//         message: "Login successful",
//         userId: user._id,
//         userType: user.type,
//       });
//     } else {
//       res.status(401).json({ message: "Invalid username or password" });
//     }
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// });
// login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
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
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// // Route to handle student login
// router.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   const student = await Student.findOne({ username, password });
//   if (student) {
//     res.status(200).json({ message: "Login successful", student });
//   } else {
//     res.status(401).json({ message: "Invalid username or password" });
//   }
// });

// Define a route to fetch a student record based on the user ID
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    // Find the student record in the database based on the user ID
    const student = await Student.findOne({ user: userId });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Return the student record as a response
    res.status(200).json(student);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
