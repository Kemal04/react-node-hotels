const { verify } = require("jsonwebtoken")

const isAdmin = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "User not logged in!" });

  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken

    if (validToken) {
      if (req.user.role == "User" || req.user.role == "Hotel") {
        return res.status(403).json({ error: "Sizin hich hili hukugynyz yok!!" });
      }
      return next();
    }

  } catch (err) {
    return res.json({ error: err });
  }
};

const isHotel = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "User not logged in!" });
  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {
      if (req.user.role == "User") {
        return res.status(403).json({ error: "Sizin hic hili hukugynyz yok!!" });
      }
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  if (!accessToken) return res.json({ error: "User not logged in!" });
  try {
    const validToken = verify(accessToken, "importantsecret");
    req.user = validToken;
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: err });
  }
};


module.exports = { isAdmin, isHotel, validateToken };