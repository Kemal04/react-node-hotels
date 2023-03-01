const express = require("express")
const router = express.Router();
const roomContactController = require("../controllers/roomContact.controller");


router.get("/", roomContactController.AllContactGet);
// router.get("/:contactId", roomContactController.singleContact);

module.exports = router;