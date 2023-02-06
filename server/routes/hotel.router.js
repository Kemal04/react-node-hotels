const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddleware");
const hotelController = require("../controllers/hotel.controller");


router.get("/", hotelController.allHotelGet);
router.post("/create", isAdmin, hotelController.createPost);


module.exports = router;