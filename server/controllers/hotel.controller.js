const { Hotel,Room, RoomType } = require("../models/model")
const bcrypt = require('bcrypt');
const sequelizePaginate = require("sequelize-paginate");
sequelizePaginate.paginate(Hotel);

const getNextPage = (page, total) => {
    const a = page < total ? +page + 1 : total;
    return a;
};
//superAdmin ucin hotel CRUD

module.exports.allHotelGet = async (req, res) => {
    const page = req.query.page ? req.query.page : 1;
    const size = 5;
    const options = {
        page: +page,
        paginate: +size,
    };
    var before = page > 1 ? +page - 1 : 1;
    await Hotel.paginate(options)
        .then((hotels) => {
            res.json({
                hotels: hotels,
                pagination: {
                    before: before,
                    page: page,
                    next: getNextPage(page, Math.floor(hotels.total / size) + 1),
                    total: hotels.total,
                }
            })
        })
}

module.exports.singleGet = async (req, res) => {
    await Hotel.findOne({
        where: { id: req.params.hotelId }
    })
        .then(async(data) => {
            await Room.findAll({
                where: {hotelId: req.params.hotelId},
                include:{model: RoomType, attributes: ['id', 'name'] }
            }).then((rooms)=>{
                res.json({
                    hotel:data,
                    rooms:rooms
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