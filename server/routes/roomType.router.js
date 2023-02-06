const express = require("express");
const router = express.Router;

const RoomtypeController = require("../controllers/roomType.controller")

router.get("/", RoomtypeController.AllTypesGet)

module.exports = router;