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

const notiForAcceptingFriendRequest = async (req, res) => {
  try {
    const { accepter, user } = req.body;
    const noti = await Notification.findOne({ notiOwner: accepter });
    const updatedNotis = noti.notifications.map((n) => {
      if (n.user.toString() === user) {
        return {
          ...n.toObject(),
          responded: "You accepted this friend request",
        };
      }
      return n;
    });
    console.log(updatedNotis);
    noti.notifications = updatedNotis;
    await noti.save();
    res.status(200).json(noti);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deleteNoti = (req, res) => {
  try {
    const { uid, rid } = req.body;
    Notification.findOne({
      notiOwner: rid,
    }).then((resp) => {
      const result = resp.notifications.filter(
        (noti) => noti.user.toString() !== uid
      );
      resp.notifications = result;
      resp.save().then(() => {});
      res.status(200).json("Success.");
    });
  } catch (err) {
    res.status(400).json(err);
  }
};
exports.getNotiByUserId = getNotiByUserId;
exports.addNoti = addNoti;
exports.deleteNoti = deleteNoti;
exports.notiForAcceptingFriendRequest = notiForAcceptingFriendRequest;
