const express = require("express")
const router = express.Router();
const roomContactController = require("../controllers/roomContact.controller");
const {validateToken} = require("../middlewares/authMiddleware")

router.get("/", roomContactController.AllContactGet);
router.get("/create", roomContactController.createContactGet);
router.post("/create", validateToken, roomContactController.createContactPost);
router.get("/:contactId", roomContactController.singleContact);



module.exports = router;