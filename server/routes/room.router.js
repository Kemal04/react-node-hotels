const express = require('express');
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddleware");
const roomController = require("../controllers/room.controller");

//superAdmin ucin roomlar

router.get("/", roomController.AllRoomsGet);
router.get("/:roomId", roomController.singleGet);
router.get("/edit/:roomId", isAdmin, roomController.editGet);
router.post("/edit/:roomId", isAdmin, roomController.editPost);
router.delete("/delete/:roomId", isAdmin, roomController.destroy);

module.exports = router;