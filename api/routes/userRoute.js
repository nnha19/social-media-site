const router = require("express").Router();
const userController = require("../controller/userController");

router.post("/facebook/auth", userController.facebookAuth);

module.exports = router;
