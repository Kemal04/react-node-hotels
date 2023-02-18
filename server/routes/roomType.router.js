const express = require("express");
const router = express.Router();
const {isAdmin} = require("../middlewares/authMiddleware");
const RoomtypeController = require("../controllers/roomType.controller")


//superAdmin ucin roomType

router.get("/", RoomtypeController.AllTypesGet);
router.get("/:roomTypeId", RoomtypeController.singleGet)
router.post("/create", isAdmin, RoomtypeController.createPost);
router.get("/edit/:id", isAdmin, RoomtypeController.RoomTypeEditGet )
router.post("/edit/:id", isAdmin, RoomtypeController.RoomtypeEditPost);
router.delete("/delete/:id", isAdmin, RoomtypeController.RoomTypeDelete);

module.exports = router;