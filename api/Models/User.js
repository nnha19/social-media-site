const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  profilePicture: { type: String },
});

module.exports = mongoose.model("User", userSchema);
