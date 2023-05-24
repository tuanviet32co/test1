const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const majorSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Major", majorSchema);