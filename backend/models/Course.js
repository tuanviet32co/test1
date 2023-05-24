const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  session: Number,
  faculty: String,
  term: {
    type: Schema.Types.ObjectId,
    ref: "Term"
  },
  major: {
    type: Schema.Types.ObjectId,
    ref: "Major",
    required: true,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category"
    }
  ],
  level: Number,
});

module.exports = mongoose.model('Course', courseSchema);