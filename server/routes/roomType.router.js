const express = require("express");
const router = express.Router();
const {isAdmin} = require("../middlewares/authMiddleware");
const RoomtypeController = require("../controllers/roomType.controller")

router.get("/", RoomtypeController.AllTypesGet);
router.post("/create", isAdmin, RoomtypeController.createPost);
router.post("/edit/:id", isAdmin, RoomtypeController.RoomtypeEdit);
router.delete("/delete/:id", isAdmin, RoomtypeController.RoomTypeDelete);

module.exports = router;