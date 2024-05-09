import express from "express";
import { Student } from "../models/studentsModel.js";

const router = express.Router();

// Route to add a new student
router.post("/", async (request, response) => {
  try {
    const { name, fatherName, class: className, subjects } = request.body;

    if (
      !name ||
      !fatherName ||
      !className ||
      !subjects ||
      subjects.length === 0
    ) {
      return response.status(400).send({
        message: `Send all required fields: Name, Father Name, Class, and at least one Subject`,
      });
    }

    const newStudent = {
      name,
      fatherName,
      class: className,
      subjects,
    };

    const student = await Student.create(newStudent);
    return response.status(201).json(student); // Use 201 Created status for successful creation
  } catch (error) {
    console.error(error.message);
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
    const { name, fatherName, class: className, subjects } = request.body;

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

// Route to delete a student
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Student.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Student not found" });
    }

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

export default router;
