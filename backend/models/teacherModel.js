// import mongoose from "mongoose";

// const attendanceSchema = new mongoose.Schema({
//   type: {
//     type: String,
//     enum: ["in", "out"],
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const teacherSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   subject: {
//     type: String,
//     required: true,
//   },
//   age: {
//     type: Number,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   address: {
//     type: String,
//     required: true,
//   },
//   qualification: {
//     type: String,
//     required: true,
//   },
//   attendance: [attendanceSchema],
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   type: {
//     type: String,
//     default: "teacher",
//   },
//   username: String,
//   password: String,
// });

// export const Teacher = mongoose.model("Teacher", teacherSchema);

import mongoose from "mongoose";

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

  attendance: [
    {
      type: {
        type: String, // 'in' or 'out'
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Teacher = mongoose.model("Teacher", teacherSchema);
