import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["in", "out"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  attendance: [attendanceSchema],
});

export const Teacher = mongoose.model("Teacher", teacherSchema);
