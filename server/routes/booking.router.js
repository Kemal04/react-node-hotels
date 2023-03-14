const express = require('express');
const router = express.Router();
const { Booking, Room, User, RoomType, Hotel } = require("../models/model");
const { validateToken, isAdmin, isHotel } = require("../middlewares/AuthMiddleware");
const bookingController = require("../controllers/booking.controller")


router.get("/", bookingController.AllBookingGet);
router.get("/currentBooking", bookingController.currentBookingGet)
router.get("/user", validateToken, bookingController.singleBookingGet)
router.get("/hotel", isHotel, bookingController.hotelBookingGet)
//booking create for user
router.post("/create", validateToken, bookingController.createBookingPost)

//every hotel ucin booking edit
router.get("/edit/:bookingId", isHotel, bookingController.editBookingGet)
router.post("/edit/:bookingId", isHotel, bookingController.editBookingPost)

//every hotel ucin booking delete
router.delete("/delete/:bookingId", isHotel, bookingController.destroy)

//admin ucin booking delete
router.delete("/admin/delete/:bookingId", isAdmin, bookingController.destroyForAdmin)

module.exports = router;