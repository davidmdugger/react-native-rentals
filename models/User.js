const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    defualt: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
