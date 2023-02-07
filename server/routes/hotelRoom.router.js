const express = require("express");
const router = express.Router();
const { isHotel } = require("../middlewares/authMiddleware");
const hotelRoomController = require("../controllers/hotelRoom.controller");

const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });

router.get("/", isHotel, hotelRoomController.AllRoomsGet);
router.get("/create", isHotel, hotelRoomController.createGet)
router.post("/create", isHotel, imageUpload.upload.single("img"), hotelRoomController.createPost);
router.get("/edit/:id", isHotel, hotelRoomController.editGet);
router.post("/edit/:id", isHotel, imageUpload.upload.single("img"), hotelRoomController.editPost)
router.delete("/delete/:id", isHotel, hotelRoomController.destroy)
module.exports = router;