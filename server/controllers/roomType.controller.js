const { RoomType, Room } = require("../models/model");

//superAdmin ucin roomType

module.exports.AllTypesGet = async (req, res) => {
    await RoomType.findAll()
        .then((roomTypes) => {
            res.json({ roomTypes: roomTypes })
        })
}

module.exports.singleGet = async (req, res) => {
    await RoomType.findAll({
        where: { id: req.params.roomTypeId }
    })
    .then((roomType) => {
        res.json({ roomType: roomType })
    }) 
    .catch((err)=>{
        res.status(500).json({err})
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

module.exports.RoomTypeEditGet = async (req, res) => {
    await RoomType.findOne({
        where: { id: req.params.id }
    })
        .then((roomType) => {
            res.json({ roomType: roomType })
        })
}

module.exports.RoomtypeEditPost = async (req, res) => {
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