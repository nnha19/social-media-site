const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  notiOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  notifications: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      action: { type: String, required: true },
      type: { type: String },
      date: { type: String },
      responded: { String },
    },
  ],
});

module.exports = mongoose.model("Notification", notificationSchema);
