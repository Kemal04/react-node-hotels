const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/authMiddleware");
const hotelController = require("../controllers/hotel.controller");


router.get("/", hotelController.allHotelGet);
router.post("/create", hotelController.createPost);


module.exports = router;