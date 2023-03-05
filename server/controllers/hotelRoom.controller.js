const { Room, RoomType, Hotel } = require("../models/model");
const fs = require('fs')
const path = require("path");


// Otellerin admin paneli ucin roomlar

module.exports.AllRoomsGet = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = 10;
    const offset = (page - 1) * size;
    const limit = page * size;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await Room.findAndCountAll({
        limit,
        offset,
        include: [
            { model: Hotel, attributes: ['id', 'name'] },
            { model: RoomType, attributes: ['id', 'name'] }
        ],
        where: req.user.role == "Hotel" ? { hotelId: req.user.id } : null
    })
        .then((rooms) => {
            if (rooms) {
                return res.json({
                    rooms: rooms.rows,
                    pagination: {
                        before: before,
                        next: next,
                        page: page,
                        total: rooms.count,
                        pages: Math.ceil(rooms.count / size)
                    }
                });
            }
            console.log(rooms);
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

module.exports.singleGet = async (req, res) => {
    await Room.findOne({
        where: {
            id: req.params.roomId,
            hotelId: req.user.id
        },
        include: [
            { model: Hotel, attributes: ['id', 'name'] },
            { model: RoomType, attributes: ['id', 'name'] }
        ]
    })
        .then((room) => {
            if (room) {
                res.json({ room: room })
            } else {
                res.json({ error: "Otag tapylmady" })
            }
        })
        .catch((err) => {
            res.status(500).json({ err })
        })
}

module.exports.createGet = async (req, res) => {
    await RoomType.findAll({ attributes: ['id', 'name'] })
        .then((roomType) => {
            res.json({
                roomType: roomType
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

module.exports.createPost = async (req, res) => {
    await Room.create({
        roomNum: req.body.roomNum,
        capacity: req.body.capacity,
        size: req.body.size,
        price: req.body.price,
        img: req.file.filename,
        description: req.body.description,
        roomtypeId: req.body.roomtypeId,
        hotelId: req.user.id
    })
        .then(() => {
            res.json({ success: "Otag ustunlikli gosuldy" });
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

module.exports.editGet = async (req, res) => {
    await Room.findOne({
        where: {
            id: req.params.roomId,
            hotelId: req.user.id
        },
        include: [
            { model: Hotel, attributes: ['id', 'name'] },
            { model: RoomType, attributes: ['id', 'name'] }
        ]
    })
        .then((room) => {
            if (room) {
                return res.json({
                    room: room
                });
            } else res.json({ error: "Otag tapylmady" })
        })
        .catch((err) => {
            res.status(500).json(err);
        })
};

module.exports.editPost = async (req, res) => {
    let img = req.body.img;
    if (req.file) {
        img = req.file.filename;

        fs.unlink("/public/img/" + req.body.img, err => {
            console.log(err);
        })
    }

    await Room.findOne({
        where: {
            id: req.params.roomId,
            hotelId: req.user.id
        }
    })
        .then((room) => {
            if (room) {
                room.roomNum = req.body.roomNum,
                    room.capacity = req.body.capacity,
                    room.size = req.body.size,
                    room.price = req.body.price,
                    room.description = req.body.description,
                    room.img = img,
                    room.roomtypeId = req.body.roomtypeId,
                    room.save();
                return res.json({ success: "Otag üstünlikli duzedildi" })
            }
            res.json({ error: "Otag tapylmady" })
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

module.exports.destroy = async (req, res) => {
    await Room.findOne({
        where: {
            id: req.params.roomId,
            hotelId: req.user.id
        }
    })

        .then((room) => {
            if (room) {
                fs.unlink("./public/img/" + room.img, err => {
                    console.log(err);
                })
                fs.unlink("./public/compress/" + room.img, err => {
                    console.log(err);
                })
                room.destroy();
                return res.json({ success: "Otag üstünlikli pozuldy" })
            }
            res.json({ error: "Otag tapylmady" });
        })
        .catch((err) => {
            res.status(500).json(err);
        })

}