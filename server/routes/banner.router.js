const express = require("express")
const router = express.Router();
const bannerController = require("../controllers/banner.controller");
const { isAdmin } = require("../middlewares/authMiddleware")

//User ucin
router.get("/", bannerController.AllBannerGet);
router.post("/create", isAdmin, bannerController.createBannerPost);
router.get("/edit/:bannerId", isAdmin, bannerController.editBannerGet);
router.post("/edit/:bannerId", isAdmin, bannerController.editBannerPost);
router.delete("/delete/:bannerId", isAdmin, bannerController.destroy);
router.get("/:bannerId", bannerController.singleBanner);

module.exports = router;