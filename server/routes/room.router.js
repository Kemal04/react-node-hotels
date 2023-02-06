const express = require("express");
const router = express.Router();
const {isHotel} = require("../middlewares/authMiddleware");
const RoomController = require("../controllers/room.controller");

router.get("/", RoomController.AllRoomsGet);
router.post("/create", isHotel, RoomController.createPost);

module.exports = router;