const { Booking, Room, User, Hotel, CurrentBooking } = require("../models/model");

module.exports.AllBookingGet = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = 10;
    const offset = (page - 1) * size;
    const limit = page * size;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await Booking.findAndCountAll({
        limit,
        offset,
        include: [
            { model: Hotel, attributes: ['name'] },
            { model: Room },
            { model: User, attributes: ['id', 'username'] }
        ]
    }).then((booking) => {
        res.json({
            booking: booking.rows,
            pagination: {
                before: before,
                next: next,
                page: page,
                total: booking.count,
                pages: Math.ceil(booking.count / size)
            }
        })
    }).catch((err) => {
        res.status(500).json(err);
    })
}

module.exports.currentBookingGet = async (req, res) => {
    await CurrentBooking.findAll({
        where: {status: "Booked"}
    }).then((currentBooking) => {
        console.log(currentBooking)
        res.json({
            currentBooking: currentBooking
        })
    })
}

module.exports.singleBookingGet = async (req, res) => {
    await Booking.findAll({
        where: { userId: req.user.id },
        include: [
            { model: Hotel, attributes: ['name'] },
            { model: Room },
            { model: User, attributes: ['id', 'username'] }
        ]
    })
        .then((booking) => {
            res.json({ booking: booking })
        }).catch((err) => {
            res.status(500).json(err);
        })
}

module.exports.hotelBookingGet = async (req, res) => {
    await Booking.findAll({
        where: { hotelId: req.user.id },
        include: [
            { model: Room },
            { model: User, attributes: ['id', 'username'] }
        ]
    })
        .then((booking) => {
            res.json({ booking: booking })
        }).catch((err) => {
            res.status(500).json(err);
        })
}



//booking create for user
module.exports.createBookingPost = async (req, res) => {
    await Booking.create({
        checkIn: req.body.checkIn,
        checkOut: req.body.checkOut,
        phoneNum: req.body.phoneNum,
        totalDays: req.body.totalDays,
        totalAmount: req.body.totalAmount,
        hotelId: req.body.hotelId,
        roomId: req.body.roomId,
        userId: req.user.id
    })
        .then((booking) => {
            CurrentBooking.create({
                checkIn: req.body.checkIn,
                checkOut: req.body.checkOut,
                bookingId: booking.id
            })
                .then(() => {
                    res.json({ success: "Otag üstünlikli bronlandy" });
                })
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

//every hotel ucin booking edit get
module.exports.editBookingGet = async (req, res) => {
    await Booking.findOne({
        where: {
            id: req.params.bookingId,
            hotelId: req.user.id
        }
    })
        .then((booking) => {
            if (booking) {
                res.json({ booking: booking })
            } else {
                res.json({ error: "Tapylmady" })
            }
        })
        .catch((err) => {
            res.json({ err })
        })

}

//every hotel ucin booking post
module.exports.editBookingPost = async (req, res) => {
    await Booking.findOne({
        where: {
            id: req.params.bookingId,
            hotelId: req.user.id
        }
    }).then((booking) => {
        if (booking) {
            booking.check = req.body.check;
            booking.save();
            return res.json({ success: "Bron üstünlikli üytgedildi" });
        } else {
            res.json({ error: "Bron tapylmady" })
        }
    }).catch((err) => {
        res.status(500).json(err);
    })
}

//every hotel ucin booking delete
module.exports.destroy = async (req, res) => {
    await Booking.findOne({
        where: {
            id: req.params.bookingId,
            hotelId: req.user.id
        }
    }).then((booking) => {
        if (booking) {
            booking.destroy();
            return res.json({ success: "Bron üstünlikli pozuldy" })
        }
        res.json({ error: "Bron tapylmady" });
    })
        .catch((err) => {
            res.status(500).json(err);
        })
}

//admin ucin booking delete
module.exports.destroyForAdmin = async (req, res) => {
    await Booking.findOne({
        where: {
            id: req.params.bookingId
        }
    }).then((booking) => {
        if (booking) {
            booking.destroy();
            return res.json({ success: "Bron üstünlikli pozuldy" })
        }
        res.json({ error: "Bron tapylmady" });
    })
        .catch((err) => {
            res.status(500).json(err);
        })
}