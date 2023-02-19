const express = require("express")
const router = express.Router();
const contactController = require("../controllers/contact.controller");
const csrf = require('csurf')
const bodyParser = require('body-parser')
const parseForm = bodyParser.urlencoded({ extended: false })
const csrfProtection = csrf({ cookie: true })

//User ucin
router.get("/", contactController.AllContactGet);
router.get("/create", csrfProtection, contactController.createContactGet)
router.post("/create",  parseForm, csrfProtection, contactController.createContactPost);
router.get("/edit/:contactId", contactController.editContactGet);
router.post("/edit/:contactId", contactController.editContactPost);
router.delete("/delete/:contactId", contactController.destroy);
router.get("/:contactId", contactController.singleContact);

module.exports = router;