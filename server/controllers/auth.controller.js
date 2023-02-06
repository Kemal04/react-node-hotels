const { User, Admin, Hotel } = require('../models/model');
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");
const bcrypt = require('bcrypt');


exports.registerPost = async (req, res) => {
    const { username, phoneNum, password } = req.body;
    if (!(username && phoneNum && password)) {
        res.json({ error: "Ahli oyjukleri doldurun" });
    }
    const user = await User.findOne({ where: { phoneNum: phoneNum } });
    if (!user) {
        var hashedPassword = await bcrypt.hash(password, 10);
        try {
            const user = await User.create({
                username: username,
                phoneNum: phoneNum,
                password: hashedPassword
            });
            const accessToken = sign(
                { phoneNum: user.phoneNum, id: user.id, role: user.role },
                "importantsecret"
            );
            res.json({ success: "Hasaba alyndy", token: accessToken });
        }
        catch (err) {
            console.log(err)
        }
    } else {
        res.json({ error: "Sizin nomeriniz bilen on hasap acylypdyr" })
    }
}

exports.loginPost = async (req, res) => {
    const { phoneNum, password } = req.body;
    await User.findOne({ where: { phoneNum: phoneNum } })
        .then(user => {
            if (!user || user.phoneNum !== phoneNum) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, user.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    const accessToken = sign(
                        { phoneNum: user.phoneNum, id: user.id, role: user.role },
                        "importantsecret"
                    );
                    res.json({ success: "Giris kabul edildi", token: accessToken });
                }
            }
        })
}

exports.authGet = (req, res) => {
    res.json(req.user);
}

exports.infoGet = async (req, res) => {
    const id = req.params.id;
    const basicInfo = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
    });

    res.json(basicInfo);
}

exports.rootmanLogin = async (req, res) => {
    const { email, password } = req.body;
    await Admin.findOne({ where: { email: email } })
        .then(admin => {
            if (!admin || admin.email !== email) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, admin.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    const accessToken = sign(
                        { id: admin.id, email: admin.email, role: admin.role },
                        "importantsecret"
                    );
                    res.json({ token: accessToken });
                }
            }
        })
}

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    await Hotel.findOne({ where: { email: email } })
        .then(hotel => {
            if (!hotel || hotel.email !== email) {
                res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
            } else {
                var passwordIsValid = bcrypt.compareSync(password, hotel.password)
                if (!passwordIsValid) {
                    res.json({ error: "Ulanyjynyň nomeri ýa-da açar sözi nädogry" })
                } else {
                    const accessToken = sign(
                        { id: hotel.id, email: hotel.email, role: hotel.role },
                        "importantsecret"
                    );
                    res.json({ token: accessToken });
                }
            }
        })
}

