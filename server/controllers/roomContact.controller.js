const { RoomContact, User, Room, Hotel } = require("../models/model")


//User ucin

module.exports.AllContactGet = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = 3;
    const offset = (page - 1) * size;
    const limit = page * size;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    
    await RoomContact.findAndCountAll({
        limit,
        offset,
        include: [
            { model: Hotel, attributes: ['id', 'name'] },
            { model: User, attributes: ['id', 'username'] },
            { model: Room, attributes: ['id', 'roomNum'] }
        ]
    }).then((contacts) => {
        return res.json({
            contacts: contacts.rows,
            pagination: {
                before: before,
                next: next,
                page: page,
                total: contacts.count,
                pages: Math.ceil(contacts.count / size)
            }
        })
    }).catch((err) => {
        console.log(err)
        res.status(500).json({ err })
    })
}

module.exports.singleContact = async (req, res) => {
    await RoomContact.findOne({
        where: {
            id: req.params.contactId,
            hotelId: req.user.id
        }
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
        comment: req.body.comment,
        userId: req.user.id,
        roomId: req.body.roomId,
        hotelId: req.body.hotelId
    })
        .then(() => {
            res.json({ success: "Teswir ustunlikli ugradyldy" });
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json(err);
        })
}
