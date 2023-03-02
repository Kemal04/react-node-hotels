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
        img: req.body.img
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
    await Banner.update(
        {
            title: req.body.title,
            description: req.body.description,
            img: req.body.img,
            check: req.body.check
        },
        { where: { id: req.params.bannerId } })
        .then(() => {
            res.json({ success: "Banner ustunlikli uytgedildi" });
        })
        .catch((err) => {
            res.json({ err })
        })
}

module.exports.destroy = async (req, res) => {
    await Banner.findOne({
        where: { id: req.params.bannerId }
    }).then((banner) => {
        if (banner) {
            banner.destroy();
            return res.json({ success: "Banner ustunlikli pozuldy" })
        } else {
            res.json({ error: "Banner tapylmady" })
        }
    }).catch((err) => {
        res.status(500).json({ err });
    })
}