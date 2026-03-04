const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../middlewares/errors/UnauthorizedError");

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15m",
    })
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: "5d"
    })
}

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new UnauthorizedError("Invalid access token");
    }
}

const verifyRefreshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    }
    catch (error) {
        throw new UnauthorizedError("Invalid refresh token");
    }
}

module.exports = {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken};
