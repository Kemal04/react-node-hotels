const sequelizePaginate = require("sequelize-paginate");
const axios = require("axios")
const { Contact } = require("../models/model")


//User ucin

module.exports.AllContactGet = async (req, res) => {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = 3;
    const offset = (page - 1) * size;
    const limit = page * size;
    var before = offset > 0 ? page - 1 : 1;
    var next = page + 1;
    await Contact.findAndCountAll({ limit, offset }).then((contacts) => {
        res.json({
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
    await Contact.findOne({
        where: { id: req.params.contactId }
    }).then((contact) => {
        if (contact) {
            res.json({ contact: contact })
        } else {
            res.json({ error: "Tapylmady" })
        }
    })
}

module.exports.createContactPost = async (req, res) => {
    axios({
        url: `https://www.google.com/recaptcha/api/siteverify/?secret=${process.env.SECRET_KEY}&response=${req.body.recaptchaValue}`,
        method: 'POST'
    }).then(async ({ data }) => {
        if (data.success) {
            await Contact.create({
                name: req.body.name,
                email: req.body.email,
                subject: req.body.subject,
                comment: req.body.comment
            }).then(() => {
                res.json({ success: "Teswir ustunlikli ugrdyldy" });
            })
        } else {
            return res.status(400).json({ error: "Recaptcha verifikasiya amala asmady" })
        }
    }).catch((err) => {
        res.status(500).json(err);
    })
}


module.exports.editContactGet = async (req, res) => {
    await Contact.findOne({
        where: { id: req.params.contactId }
    })
        .then((contact) => {
            res.json({ contact: contact })
        })
}

module.exports.editContactPost = async (req, res) => {
    await Contact.update(
        {
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            comment: req.body.comment,
            check: req.body.check
        },
        { where: { id: req.params.contactId } })
        .then(() => {
            res.json({ success: "ustunlikli uytgedildi" });
        })
        .catch((err) => {
            res.json({ err })
        })
}

module.exports.destroy = async (req, res) => {
    await Contact.findOne({
        where: { id: req.params.contactId }
    }).then((contact) => {
        if (contact) {
            contact.destroy();
            return res.json({ success: "Teswir ustunlikli pozuldy" })
        } else {
            res.json({ error: "Teswir tapylmady" })
        }
    }).catch((err) => {
        res.status(500).json({ err });
    })
}