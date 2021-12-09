const router = require("express").Router({});
const friendRequestsController = require("../controller/friendRequestsController");

router.get("/:uid/request", friendRequestsController.getFriendRequests);
router.post(`/:uid/request/:rid`, friendRequestsController.sendFriendRequest);
router.delete("/:uid/request/:rid", friendRequestsController.cancelFriRequest);

module.exports = router;
