const { RoomContact, User, Room } = require("../models/model")



//User ucin

module.exports.AllContactGet = async (req, res) => {
    await RoomContact.findAll({
        include: [
            { model: User, attributes: ['id', 'name'] },
            { model: Room, attributes: ['id', 'name'] }
        ]
    }).then((contacts) => {
        return res.json({
            contacts: contacts
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ err })
    })
}