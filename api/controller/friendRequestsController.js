const FriendRequests = require("../Models/FriendRequests");
const Notification = require("../Models/Notification");
const axios = require("axios");

const getFriendRequests = async (req, res) => {
  const { uid } = req.params;
  const userFriReqs = await FriendRequests.findOne({ userId: uid });
  res.status(200).json(userFriReqs);
};

const sendFriendRequest = async (req, res) => {
  let { uid, rid } = req.params;
  const sender = await FriendRequests.findOne({ userId: uid });
  if (!sender.sentRequests) sender.sentRequests = [];
  sender.sentRequests.push(rid);
  await sender.save();

  const receiptFriReqs = await FriendRequests.findOne({ userId: rid });
  if (!receiptFriReqs.sentRequests) receiptFriReqs.sentRequests = [];
  receiptFriReqs.friendRequests.push(uid);
  await receiptFriReqs.save();

  //Send notification to the user who just received a friend request
  const resp = await axios({
    url: `http://localhost:5000/noti/${rid}`,
    method: "POST",
    data: {
      action: "sent you a friend request",
      type: "friend request",
      user: uid,
    },
  });

  res.status(200).json(sender);
};

var ObjectId = require("mongoose").Types.ObjectId;

const cancelFriRequest = async (req, res) => {
  const { uid, rid } = req.params;
  const sender = await FriendRequests.findOne({ userId: uid });
  const updated = sender.sentRequests.filter((u) => u.toString() !== rid);
  sender.sentRequests = updated;
  await sender.save();

  const rp = await FriendRequests.findOne({ userId: rid });
  const updatedRp = rp.friendRequests.filter((u) => u.toString() !== uid);
  rp.friendRequests = updatedRp;
  await rp.save();

  // When friend request is canceled, go delete the
  //  notification so the recipent can no longer accept the
  //  cancelled fri request.
  const notis = Notification.findOne({
    notiOwner: rid,
  }).then((res) => {
    const result = res.notifications.filter(
      (noti) => noti.user.toString() !== uid
    );
    res.notifications = result;
    res.save().then(() => {});
  });

  res.status(200).json(sender);
};

exports.getFriendRequests = getFriendRequests;
exports.sendFriendRequest = sendFriendRequest;
exports.cancelFriRequest = cancelFriRequest;
