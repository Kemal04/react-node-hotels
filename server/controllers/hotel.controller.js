const { Admin, Hotel } = require("../models/model")
const bcrypt = require('bcrypt');

module.exports.allHotelGet = async (req, res) => {
    await Admin.findAll({ where: { Role: "Hotel" }, include: Hotel })
        .then((hotels) => {
            res.json({ hotels: hotels })
        })
}

module.exports.createPost = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    await Hotel.create({
        name: req.body.name
    })
        .then((hotel) => {
            Admin.create({
                email: req.body.email,
                password: hash,
                hotelId: hotel.id
            })
                .then(() => {
                    res.json({ success: "hotel ustunlikli gosuldy" });
                });
        })
}
