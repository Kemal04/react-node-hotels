const express = require("express")
const router = express.Router();
const roomContactController = require("../controllers/roomContact.controller");
const { validateToken, isHotel } = require("../middlewares/authMiddleware")

router.get("/", isHotel, roomContactController.AllContactGet);
router.get("/create", roomContactController.createContactGet);
router.post("/create", validateToken, roomContactController.createContactPost);
router.get("/:contactId", isHotel, roomContactController.singleContact);
router.get("/edit/:contactId", isHotel, roomContactController.editGet);
router.post("/edit/:contactId", isHotel, roomContactController.editPost);
router.delete("/delete/:contactId", isHotel, roomContactController.destroy);


module.exports = router;