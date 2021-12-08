const mongoose = require("mongoose");

const friendsSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId },
  friends: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = mongoose.model("Friends", friendsSchema);
