const { Admin, Hotel } = require("../models/model")
const bcrypt = require('bcrypt');

module.exports.allHotelGet = async (req, res) => {
    await Hotel.findAll()
        .then((hotels) => {
            res.json({ hotels: hotels })
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