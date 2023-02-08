const { Room, RoomType, Hotel } = require("../models/model");

//superAdmin ucin roomlar

module.exports.AllRoomsGet = async (req, res) => {
    await Room.findAll({
        include: [
            { model: Hotel, attributes: ['id', 'name'] },
            { model: RoomType, attributes: ['id', 'name'] }
        ]
    })
        .then((rooms) => {
            res.json({ rooms: rooms })
        })
}


module.exports.singleGet = async (req, res) => {
    await Room.findOne({
        where: { id: req.params.roomId },
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


module.exports.editGet = async (req, res) => {
    await Room.findOne({
        where: {
            id: req.params.roomId
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

        fs.unlink("public/img/" + req.body.img, err => {
            console.log(err);
        })
    }

    await Room.findOne({
        where: {
            id: req.params.roomId
        }
    })
        .then((room) => {
            if (room) {
                room.roomNum = req.body.roomNum,
                    room.capacity = req.body.capacity,
                    room.size = req.body.size,
                    room.price = req.body.price,
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
        where: { id: req.params.roomId }
    })
        .then((room) => {
            if (room) {
                room.destroy();
                return res.json({ success: "Otag ustunlikli yok edildi" })
            } else {
                res.json({ error: "Otag tapylmady" })
            }
        })
}