const { Room, RoomType, Hotel } = require("../models/model");


module.exports.AllRoomsGet = async (req, res) => {
    await Room.findAll({
        include: [
            { model: Hotel, attributes: ['id', 'name'] },
            { model: RoomType, attributes: ['id', 'name'] }]
    })
        .then((rooms) => {
            res.json({ rooms: rooms })
        })
}
