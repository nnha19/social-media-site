const router = require("express").Router({});
const friendController = require("../controller/friendController");

router.get("/:uid", friendController.getFriendsOfAUser);
router.post("/", friendController.becomeFriend);
router.delete("/", friendController.unFriend);

module.exports = router;
