const FriendRequests = require("../Models/FriendRequests");
const getFriendRequests = async (req, res) => {
  const { uid } = req.params;
  const userFriReqs = await FriendRequests.findOne({ userId: uid });
  console.log(userFriReqs);
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
  res.status(200).json(receiptFriReqs);
};

// const cancelFriRequest = async () => {
//   const { uid, rid } = req.params;
//   FriendRequests.find({ userId: uid });
// };

exports.getFriendRequests = getFriendRequests;
exports.sendFriendRequest = sendFriendRequest;
