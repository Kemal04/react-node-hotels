const express = require("express");
const router = express.Router();
const { isHotel } = require("../middlewares/authMiddleware");
const hotelRoomController = require("../controllers/hotelRoom.controller");

const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });


// Otellerin admin paneli ucin roomlar

router.get("/", isHotel, hotelRoomController.AllRoomsGet);
router.get("/:roomId", isHotel, hotelRoomController.singleGet);
router.get("/create", isHotel, hotelRoomController.createGet);
router.post("/create", isHotel, imageUpload.upload.single("img"), hotelRoomController.createPost);
router.get("/edit/:roomId", isHotel, hotelRoomController.editGet);
router.post("/edit/:roomId", isHotel, imageUpload.upload.single("img"), hotelRoomController.editPost);
router.delete("/delete/:roomId", isHotel, hotelRoomController.destroy);

module.exports = router;