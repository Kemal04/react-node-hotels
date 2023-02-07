const { Room, RoomType, Hotel } = require("../models/model");

module.exports.AllRoomsGet = async (req, res) => {
    await Room.findAll({ include: Hotel})
        .then((rooms) => {
            res.json({ rooms: rooms })
        })
}

module.exports.createPost = async (req, res) => {
    await Room.create({
        roomNum: req.body.roomNum,
        capacity: req.body.capacity,
        size: req.body.size,
        img: req.file.filename,
        roomtypeId: req.body.roomtypeId,
        hotelId: req.user.id
    })
        .then(()=> {
            res.json({success: "Otag ustunlikli gosuldy"});
        })
        .catch((err)=> {
            res.status(500).json(err);
        })
}