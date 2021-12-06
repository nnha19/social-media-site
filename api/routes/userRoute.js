const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/facebook/auth", userController.facebookAuth);
router.post("/signin", userController.signInUser);
router.post("/signup", userController.signUpUser);

module.exports = router;
