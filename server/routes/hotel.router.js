const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddleware");
const hotelController = require("../controllers/hotel.controller");

//superAdmin ucin hotel CRUD

router.get("/", hotelController.allHotelGet);
router.get("/:hotelId", hotelController.singleGet);
router.post("/create", isAdmin, hotelController.createPost);
router.get("/edit/:hotelId", isAdmin, hotelController.editGet);
router.post("/edit/:hotelId", isAdmin, hotelController.editPost);
router.delete("/delete/:hotelId", isAdmin, hotelController.destroy);



module.exports = router;