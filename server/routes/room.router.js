const express = require('express');
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddleware");
const roomController = require("../controllers/room.controller");

router.get("/",  roomController.AllRoomsGet);

module.exports = router;