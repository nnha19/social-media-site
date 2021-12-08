const mongoose = require("mongoose");

const friendRequestsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  friendRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  sentRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

module.exports = mongoose.model("FriendRequests", friendRequestsSchema);
