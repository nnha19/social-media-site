const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: string, required: true },
  email: { type: string, required: true },
  password: { type: string },
  profilePicture: { type: string },
});

module.exports = moongoose.model("User", userSchema);
