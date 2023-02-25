const whiteList = ["localhost:3000"]

const corsOptions = (req, callback) => {
    let corsOption;
    if (whiteList.indexOf(req.header("Origin")) !== -1) {
        corsOption = { origin: true }
    } else {
        corsOption = { origin: false }
    }

    callback(null, corsOption)
}

module.exports = corsOptions;