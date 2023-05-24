const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please provide an Email!"],
    unique: [true, "Email Exist"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    unique: false,
  },
  name: {
    type: String,
    required: [true, "Please provide a name!"],
  },
  studentId: {
    type: String,
    required: [true, "Please provide a student id!"],
  },
  graduationYear: {
    type: String,
    required: [true, "Please provide a graduation year!"],
  },
  selectedCourses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  major: {
    type: Schema.Types.ObjectId,
    ref: "Major"
  },
  minor: {
    type: Schema.Types.ObjectId,
    ref: "Major"
  }
});

module.exports = mongoose.model("User", userSchema);