const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
};

const facebookAuth = async (req, res) => {
  try {
    const {
      accessToken,
      email,
      name: username,
      url: profilePicture,
    } = req.body;
    let user = await User.findOne({ email });
    if (user) {
    } else {
      user = await User.create({
        username,
        email,
        profilePicture,
      });
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
exports.getAllUsers = getAllUsers;
exports.facebookAuth = facebookAuth;
exports.signUpUser = signUpUser;
exports.signInUser = signInUser;
