const express = require("express")
const router = express.Router();
const contactController = require("../controllers/contact.controller");

//User ucin
router.get("/", contactController.AllContactGet);
router.post("/create", contactController.createContactPost);
router.get("/edit/:contactId", contactController.editContactGet);
router.post("/edit/:contactId", contactController.editContactPost);
router.delete("/delete/:contactId", contactController.destroy);
router.get("/:contactId", contactController.singleContact);

module.exports = router;