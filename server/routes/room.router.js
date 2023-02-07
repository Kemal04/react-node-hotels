const express = require("express");
const router = express.Router();
const { isHotel } = require("../middlewares/authMiddleware");
const RoomController = require("../controllers/room.controller");
const fs = require('fs')
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });

router.get("/", RoomController.AllRoomsGet);
router.post("/create", isHotel, imageUpload.upload.single("img"), RoomController.createPost);

module.exports = router;