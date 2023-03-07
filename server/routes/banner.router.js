const express = require("express")
const router = express.Router();
const bannerController = require("../controllers/banner.controller");
const { isAdmin } = require("../middlewares/authMiddleware")
const imageUpload = require("../helpers/image-upload")
const multer = require("multer");
const upload = multer({ dest: "./public/img" });


//User ucin
router.get("/", bannerController.AllBannerGet);
router.post("/create", isAdmin, imageUpload.upload.single("img"), bannerController.createBannerPost);
router.get("/edit/:bannerId", isAdmin, bannerController.editBannerGet);
router.post("/edit/:bannerId", isAdmin, imageUpload.upload.single("img"), bannerController.editBannerPost);
router.delete("/delete/:bannerId", isAdmin, bannerController.destroy);
router.get("/:bannerId", bannerController.singleBanner);

module.exports = router;