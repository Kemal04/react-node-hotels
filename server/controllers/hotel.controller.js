const { Hotel } = require("../models/model")
const bcrypt = require('bcrypt');

//superAdmin ucin hotel CRUD

module.exports.allHotelGet = async (req, res) => {
    await Hotel.findAll()
        .then((hotels) => {
            res.json({ hotels: hotels })
        })
}

module.exports.singleGet = async (req, res) => {
    await Hotel.findOne({
        where: { id: req.params.hotelId }
    })
        .then((hotel) => {
            if (hotel) {
                res.json({ hotel: hotel })
            } else {
                res.json({ error: "Otel tapylmady" })
            }
        })
}

module.exports.createPost = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    await Hotel.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
    })
        .then(() => {
            res.json({ success: "hotel ustunlikli gosuldy" });
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}

module.exports.editGet = async (req, res) => {
    await Hotel.findOne({
        where: { id: req.params.hotelId }
    })
        .then((hotel) => {
            if (hotel) {
                res.json({ hotel: hotel })
            } else {
                res.json({ error: "Otel tapylmady" })
            }
        })
}

module.exports.editPost = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    await Hotel.update({
        name: req.body.name,
        email: req.body.email,
        password: hash
    },
        { where: { id: req.params.hotelId } })
        .then(() => {
            res.json({ success: "Otelin maglumatlary uytgedildi" });
        })
        .catch((err) => {
            res.json({ err })
        })
}

module.exports.destroy = async (req, res) => {
    await Hotel.findOne({
        where: { id: req.params.hotelId }
    })
        .then((hotel) => {
            if (hotel) {
                hotel.destroy();
                return res.json({ success: "Otel ustunlikli yok edildi" })
            } else {
                res.json({ error: "Otel tapylmady" })
            }
        })
}