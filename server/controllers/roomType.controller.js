const { RoomType } = require("../models/model");

module.exports.AllTypesGet = async (req, res) => {
    await RoomType.findAll()
        .then((roomTypes) => {
            res.json({ roomTypes: roomTypes })
        })
}

module.exports.createPost = async (req, res) => {
    await RoomType.create({ name: req.body.name })
        .then(() => {
            res.json({ success: "Otag gornusi ustunlikli gosuldy" });
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

module.exports.RoomtypeEdit = async (req, res) => {
    await RoomType.update(
        { name: req.body.name },
        { where: { id: req.params.id } })
        .then(() => {
            res.json({ success: "ustunlikli uytgedildi" });
        })
        .catch((err) => {
            res.json({ err })
        })
}

module.exports.RoomTypeDelete = async (req, res) => {
    await RoomType.destroy({ where: { id: req.params.id } })
        .then(() => {
            res.json({ success: "Otag gornusi ustunlukli pozuldy" });
        })
        .catch((err) => {
            res.json({ err })
        })
}