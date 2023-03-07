const { Banner } = require("../models/model")


module.exports.AllBannerGet = async (req, res) => {
    await Banner.findAll().then((banners) => {
        res.json({
            banners: banners
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ err })
    })
}

module.exports.singleBanner = async (req, res) => {
    await Banner.findOne({
        where: { id: req.params.bannerId }
    }).then((banner) => {
        if (banner) {
            res.json({ banner: banner })
        } else {
            res.json({ error: "Tapylmady" })
        }
    })
}

module.exports.createBannerPost = async (req, res) => {
    await Banner.create({
        title: req.body.title,
        description: req.body.description,
        img: req.file.filename
    })
        .then(() => {
            res.json({ success: "Banner ustunlikli gosuldy" });
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}


module.exports.editBannerGet = async (req, res) => {
    await Banner.findOne({
        where: { id: req.params.bannerId }
    })
        .then((banner) => {
            res.json({ banner: banner })
        })
}

module.exports.editBannerPost = async (req, res) => {
    let img = req.body.img;
    if (req.file) {
        img = req.file.filename;

        fs.unlink("/public/img/" + req.body.img, err => {
            console.log(err);
        })
    }
    await Banner.findOne({
        where: {
            id: req.params.bannerId
        }
    })
        .then((banner) => {
            if (banner) {
                banner.title = req.body.title,
                    banner.description = req.body.description,
                    banner.img = img,
                    banner.check = req.body.check
                banner.save();
                return res.json({ success: "Banner üstünlikli duzedildi" })
            }
            res.json({ error: "Banner tapylmady" })
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

module.exports.destroy = async (req, res) => {
    await Banner.findOne({
        where: { id: req.params.bannerId }
    }).then((banner) => {
        if (banner) {
            fs.unlink("./public/img/" + banner.img, err => {
                console.log(err);
            })
            banner.destroy();
            return res.json({ success: "Banner ustunlikli pozuldy" })
        } else {
            res.json({ error: "Banner tapylmady" })
        }
    }).catch((err) => {
        res.status(500).json({ err });
    })
}