const router = require("express").Router({});
const notificationController = require("../controller/notificationController");

router.get("/:uid", notificationController.getNotiByUserId);
router.post("/:uid", notificationController.addNoti);
router.delete("/", notificationController.deleteNoti);

module.exports = router;
