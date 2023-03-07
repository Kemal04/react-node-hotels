const express = require("express");
const router = express.Router();
const { isAdmin, isHotel } = require("../middlewares/authMiddleware");
const hotelController = require("../controllers/hotel.controller");
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });
//superAdmin ucin hotel CRUD

router.get("/", hotelController.allHotelGet);
router.get("/:hotelId", hotelController.singleGet);
router.post("/create", isAdmin, hotelController.createPost);
router.get("/edit/:hotelId", isAdmin, hotelController.editGet);
router.post("/edit/:hotelId", isAdmin, hotelController.editPost);
router.delete("/delete/:hotelId", isAdmin, hotelController.destroy);




//Hotel ucin hotel data update
router.get("/profil/edit/:hotelId", isHotel, hotelController.editProfilGet);
router.post("/profil/edit/:hotelId", isHotel,imageUpload.upload.single("img"), hotelController.editProfilPost);


module.exports = router;