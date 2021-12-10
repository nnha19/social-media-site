const Notification = require("../Models/Notification");

const getNotiByUserId = async (req, res) => {
  try {
    const { uid } = req.params;
    const notification = await Notification.findOne({
      notiOwner: uid,
    }).populate({
      path: "notifications.user",
    });
    res.status(200).json(notification);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
};

// Notification.remove().then((res) => console.log("Done."));

const addNoti = async (req, res) => {
  try {
    const { uid } = req.params;
    const { user, action, type } = req.body;
    let notification = await Notification.findOne({ notiOwner: uid });
    if (!notification) {
      notification = await Notification.create({
        notiOwner: uid,
        notifications: [],
      });
    }
    notification.notifications.push({
      action,
      user,
      type,
      date: new Date(),
    });
    await notification.save();
    res.status(200).json(notification);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deleteNoti = (req, res) => {
  try {
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.getNotiByUserId = getNotiByUserId;
exports.addNoti = addNoti;
