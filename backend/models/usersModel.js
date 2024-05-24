// import mongoose from "mongoose";

// const userSchema = mongoose.Schema({
//   username: { type: String, required: true },
//   password: { type: String, required: true },
//   type: {
//     type: String,
//   },
//   student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
//   teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
// });

// export const User = mongoose.model("User", userSchema);

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
});

// Pre-save hook to hash the password before saving
userSchema.pre("save", async function (next) {
  try {
    // Check if the password has been modified
    if (!this.isModified("password")) {
      return next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare the provided password with the hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

export const User = mongoose.model("User", userSchema);
