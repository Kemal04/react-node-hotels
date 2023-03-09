const { Hotel, Room, RoomType } = require("../models/model")
const bcrypt = require('bcrypt');
const fs = require('fs')
const path = require("path");


//superAdmin ucin hotel CRUD

module.exports.allHotelGet = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = 10;
    const offset = (page - 1) * size;
    const limit = page * size;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await Hotel.findAndCountAll({ limit, offset })
        .then((hotels) => {
            res.json({
                hotels: hotels.rows,
                pagination: {
                    before: before,
                    next: next,
                    page: page,
                    total: hotels.count,
                    pages: Math.ceil(hotels.count / size)
                }
            })
        })
}

module.exports.singleGet = async (req, res) => {
    await Hotel.findOne({
        where: { id: req.params.hotelId }
    })
        .then(async (data) => {
            await Room.findAll({
                where: { hotelId: req.params.hotelId },
                include: { model: RoomType, attributes: ['id', 'name'] }
            }).then((rooms) => {
                res.json({
                    hotel: data,
                    rooms: rooms
                })
            })
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

module.exports.editProfilGet = async (req, res) => {
    await Hotel.findOne({
        where: {
            id: req.user.id
        }
    })
        .then((hotel) => {
            if (hotel) {
                res.json({ hotel: hotel })
            } else {
                res.json({ error: "Otel tapylmady" })
            }
        }).catch((err) => {
            console.log(err);
        })
}

module.exports.editProfilPost = async (req, res) => {
    let img = req.body.img;
    if (req.file) {
        img = req.file.filename;

        fs.unlink("/public/img/" + req.body.img, err => {
            console.log(err);
        })
    }
    await Hotel.findOne({
        where: {
            id: req.user.id
        }
    })
        .then((hotel) => {
            if (hotel) {
                hotel.phoneNum = req.body.phoneNum,
                    hotel.address = req.body.address,
                    hotel.img = img
                hotel.save();
                return res.json({ success: "Maglumatlarynyz üstünlikli gosuldy" })
            } else {
                res.json({ error: "Tapylmady" })
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}
