const facebookAuth = async (req, res) => {
  try {
    const {
      accessToken,
      email,
      name: username,
      url: profilePicture,
    } = req.body;
    console.log(profilePicture);
  } catch (err) {
    console.log(err);
  }
};

exports.facebookAuth = facebookAuth;
