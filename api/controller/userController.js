const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const FriendRequests = require("../Models/FriendRequests");

// User.remove().then((res) => console.log("Done."));

const findFriendsToAdd = async (req, res) => {
  //Get all users, filter out the current user and the users
  //  that are already friends with current user.

  const { uid } = req.params;
  const userFriReqs = await FriendRequests.findOne({ userId: uid });
  const notEquals = [...userFriReqs.friendRequests, uid];

  const users = await User.find({
    _id: { $nin: notEquals },
  });

  res.status(200).json(users);
};

const facebookAuth = async (req, res) => {
  try {
    const { email, name: username, url: profilePicture } = req.body;
    let user = await User.findOne({ email });
    if (user) {
    } else {
      user = await User.create({
        username,
        email,
        profilePicture,
      });
      await FriendRequests.create({ userId: user._id });
    }
    if (user) {
      const token = jwt.sign({ userId: user._id, email }, process.env.JWT_KEY);
      res.status(200).json({ ...user.toObject(), token });
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
};

const signUpUser = async (req, res) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   res
    //     .status(400)
    //     .json("Invalid Input. Please fill all the required fields.");
    //   return;
    // }
    const { username, email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json("User with this email already exists.");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);
      const newUser = await User.create({
        email,
        password: hashedPassword,
        username,
      });

      const { _id } = newUser;
      await FriendRequests.create({
        userId: _id,
      });
      const token = jwt.sign({ userId: _id, email }, process.env.JWT_KEY);
      const { password, ...others } = newUser.toObject();
      res.status(200).json({ ...others, token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

const signInUser = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   res.status(400).json("Invalid Input. Please fill all the required fields.");
  //   return;
  // }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("User with the provided email doesn't exist");
    } else {
      const validPassword = await bcrypt.compare(password, user.password);
      if (validPassword) {
        const { username, _id } = user;
        const token = jwt.sign(
          {
            userId: _id,
            username,
            email,
          },
          process.env.JWT_KEY
        );
        const { password, ...others } = user.toObject();
        res.status(200).json({ ...others, token });
      } else {
        res.status(400).json("Incorrect password.");
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
exports.findFriendsToAdd = findFriendsToAdd;
exports.facebookAuth = facebookAuth;
exports.signUpUser = signUpUser;
exports.signInUser = signInUser;
