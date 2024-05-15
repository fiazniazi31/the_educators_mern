// // import mongoose from "mongoose";

// // const studentSchema = mongoose.Schema(
// //   {
// //     name: { type: String, required: true },
// //     fatherName: { type: String, required: true },
// //     class: { type: String, required: true },
// //     subjects: [{ type: String }],
// //   },
// //   { timestamps: true }
// // );

// // export const Student = mongoose.model("studnet", studentSchema);

// import mongoose from "mongoose";

// const studentSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     fatherName: { type: String, required: true },
//     class: { type: String, required: true },
//     subjects: [{ type: String }],
//     feeRecords: [
//       {
//         month: { type: String, required: true },
//         year: { type: Number, required: true },
//         amount: { type: Number, required: true },
//       },
//     ],
//     testRecords: [
//       {
//         subject: { type: String, required: true },
//         obtainMarks: { type: Number, required: true },
//         totalMarks: { type: Number, required: true },
//         date: { type: Date, required: true },
//       },
//     ],
//     attendance: [
//       {
//         date: { type: Date, required: true },
//         present: { type: Boolean, required: true },
//       },
//     ],
//     username: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
// type: {
//   type: String,
// },
//   },

//   { timestamps: true }
// );

// export const Student = mongoose.model("student", studentSchema);

import mongoose from "mongoose";

const studentSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    fatherName: { type: String, required: true },
    class: { type: String, required: true },
    subjects: [{ type: String }],
    feeRecords: [
      {
        month: { type: String, required: true },
        year: { type: Number, required: true },
        amount: { type: Number, required: true },
      },
    ],
    testRecords: [
      {
        subject: { type: String, required: true },
        obtainMarks: { type: Number, required: true },
        totalMarks: { type: Number, required: true },
        date: { type: Date, required: true },
      },
    ],
    attendance: [
      {
        date: { type: Date, required: true },
        present: { type: Boolean, required: true },
      },
    ],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  { timestamps: true }
);

export const Student = mongoose.model("student", studentSchema);
