const rateLimit = require("express-rate-limit");
const allowList = ["::1"];

const apilimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req, res) => {
        console.log("api url: ", req.url);
        console.log("api ip: ", req.ip);
        if (req.url === "/auth/login" || req.url === "/auth/register" || req.url === "/auth/rootman" || req.url === "/auth/admin/login") return 5
        else return 15
    },
    message: {
        success: false,
        message: "Siz kop gezek maglumat ugratdynyz, biraz vagtdan sonra barlap gorun"
    },
    skip: (req, res) => allowList.includes(req.ip),
    standardHeaders: true,
    legacyHeaders: false
})

module.exports = apilimiter;