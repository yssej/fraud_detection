const jwt = require("jsonwebtoken");

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30m",
    })
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "5d"
    })
}

const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
}

module.exports = {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken};
