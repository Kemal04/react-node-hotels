const express = require("express")
const router = express.Router();
const contactController = require("../controllers/contact.controller");

//User ucin
router.get("/", contactController.AllContactGet);
router.get("/:contactId", contactController.singleContact);
router.post("/create", contactController.createContactPost);
router.get("/edit/:contactId", contactController.editContactGet);
router.post("/edit/:contactId", contactController.editContactPost);
router.delete("/delete/:contactId", contactController.destroy);


module.exports = router;