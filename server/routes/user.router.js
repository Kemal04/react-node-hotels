const express = require("express");
const router = express.Router();
const { validateToken, isAdmin } = require("../middlewares/authMiddleware");
const userController = require("../controllers/user.controller");


//all data GET 
router.get("/", userController.getAlldata);

// single GET 
router.get("/:userId", userController.getSingleUser);

// USER edit GET and POST 
router.get("/edit/:userId", validateToken, userController.getEdit);
router.post("/edit/:userId", validateToken, userController.postEdit);


// SuperAdmin ucin USER edit delete
router.get("/admin/edit/:userId", isAdmin, userController.userEditGet);
router.post("/admin/edit/:userId", isAdmin, userController.userEditPost);
router.delete("/admin/delete/:userId", isAdmin, userController.destroy);


module.exports = router;