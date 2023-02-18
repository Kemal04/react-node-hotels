const express = require("express");
const router = express.Router();
const { isHotel } = require("../middlewares/authMiddleware");
const hotelRoomController = require("../controllers/hotelRoom.controller");
const csrf = require('csurf')
const bodyParser = require('body-parser')
const parseForm = bodyParser.urlencoded({ extended: false })


const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
const csrfProtection = csrf({ cookie: true })

// Otellerin admin paneli ucin roomlar

router.get("/", isHotel, hotelRoomController.AllRoomsGet);
router.get("/create", isHotel, csrfProtection, hotelRoomController.createGet);
router.post("/create", isHotel, parseForm, csrfProtection, imageUpload.upload.single("img"), hotelRoomController.createPost);
router.get("/:roomId", isHotel, hotelRoomController.singleGet);
router.get("/edit/:roomId", isHotel, hotelRoomController.editGet);
router.post("/edit/:roomId", isHotel, imageUpload.upload.single("img"), hotelRoomController.editPost);
router.delete("/delete/:roomId", isHotel, hotelRoomController.destroy);

module.exports = router;