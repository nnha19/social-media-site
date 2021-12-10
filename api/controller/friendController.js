const Friends = require("../Models/Friends");

const getFriendsOfAUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const friends = await Friends.findOne({ userId: uid });
    res.status(200).json(friends);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const becomeFriend = async (req, res) => {
  try {
    //user 1 is the one who accepted the fri req.
    // user 2 should receive notification.
    const { user1, user2 } = req.body;

    async function makeFriend(userId, friend) {
      let user = await Friends.findOne({ userId: userId });
      if (!user) {
        user = await Friends.create({
          userId,
          friends: [],
        });
      }
      user.friends.push(friend);
      await user.save();
    }
    makeFriend(user1, user2);
    makeFriend(user2, user1);

    res.status(200).json("Great.");
    // Send notification to let other user know that this
    //  user has accepted friend request
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const unFriend = async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    async function unFriFunc(u1, u2) {
      let user = await Friends.findOne({ userId: u1 });
      const userFriends = user.friends.filter((f) => f.toString() !== u2);
      user.friends = userFriends;
      await user.save();
      return user;
    }
    unFriFunc(user1, user2);
    unFriFunc(user2, user1);

    res.status(200).json("Succeded.");
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.becomeFriend = becomeFriend;
exports.unFriend = unFriend;
exports.getFriendsOfAUser = getFriendsOfAUser;
