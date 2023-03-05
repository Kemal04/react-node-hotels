const { User } = require("../models/model")


module.exports.getAlldata = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = 10;
    const offset = (page - 1) * size;
    const limit = page * size;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await User.findAndCountAll({ limit, offset }).then((users) => {
        res.json({
            users: users.rows,
            pagination: {
                before: before,
                next: next,
                page: page,
                total: users.count,
                pages: Math.ceil(users.count / size)
            }
        })
    }).catch((err) => {
        res.status(500).json({ err: err })
    })
}

module.exports.getSingleUser = async (req, res) => {
    await User.findOne({
        where: { id: req.params.userId }
    }).then((user) => {
        res.json({ user: user })
    }).catch((err) => {
        res.status(500).json(err)
    })
}

module.exports.getEdit = async (req, res) => {
    await User.findOne({
        where: { id: req.params.userId }
    }).then((user) => {
        res.json({ user: user });
    }).catch((err) => {
        res.status(500).json(err)
    })
}

module.exports.postEdit = async (req, res) => {
    await User.findOne({ where: { id: req.params.userId } })
        .then((user) => {
            if (user) {
                user.surname = req.body.surname,
                    user.email = req.body.email,
                    user.address = req.body.address
                user.save();
                return res.json({ success: "Maglumatlarynyz üstünlikli gosuldy" })
            } else {
                res.json({ error: "Ulanyjy tapylmady" })
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}


// SuperAdmin ucin USER edit, delete
module.exports.userEditGet = async (req, res) => {
    await User.findOne({
        where: { id: req.params.userId }
    })
        .then((user) => {
            if (user) {
                res.json({ user: user })
            } else {
                res.json({ error: "Ulanyjy tapylmady" })
            }
        })
}

module.exports.userEditPost = async (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    await User.findOne({ where: { id: req.params.userId } })
        .then((user) => {
            if (user) {
                user.username = req.body.username,
                    user.password = hash,
                    user.surname = req.body.surname,
                    user.email = req.body.email,
                    user.address = req.body.address
                user.save();
                return res.json({ success: "Ulanyjynyn maglumatlary üstünlikli duzedildi" })
            } else {
                res.json({ error: "Ulanyjy tapylmady" })
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}

module.exports.destroy = async (req, res) => {
    await User.findOne({ where: { id: req.params.userId } })
        .then((user) => {
            if (user) {
                user.destroy()
                return res.json({ success: "Ulanyjy ustunlikli yok edildi" })
            } else {
                res.json({ error: "Ulanyjy tapylmady" })
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}