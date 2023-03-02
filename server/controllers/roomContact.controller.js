const { RoomContact, User, Room, Hotel } = require("../models/model")



//User ucin

module.exports.AllContactGet = async (req, res) => {
    await RoomContact.findAll({
        include: [
            { model: User, attributes: ['id', 'username'] },
            { model: Hotel, attributes: ['id', 'name'] },
            { model: Room, attributes: ['id', 'roomNum'] }
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

module.exports.singleContact = async (req, res) => {
    await RoomContact.findOne({
        where: { id: req.params.contactId }
    }).then((contact) => {
        if (contact) {
            res.json({ contact: contact })
        } else {
            res.json({ error: "Tapylmady" })
        }
    })
}

module.exports.createContactGet = async (req, res) => {
    await Hotel.findAll()
        .then(async (hotels) => {
            await Room.findAll().then((rooms) => {
                res.json({
                    hotels: hotels,
                    rooms: rooms
                })
            })

        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

module.exports.createContactPost = async (req, res) => {
    await RoomContact.create({ 
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        comment:req.body.comment
     })
        .then(() => {
            res.json({ success: "Teswir ustunlikli ugradyldy" });
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}
