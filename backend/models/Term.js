const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const termSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Term", termSchema);