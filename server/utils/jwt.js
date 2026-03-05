const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../middlewares/errors/UnauthorizedError");

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_SECRET_DURATION_IN_MINUTE+"m",
    })
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
        expiresIn: process.env.JWT_REFRESH_TOKEN_DURATION_IN_DAYS+"d"
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
    if(!token) throw new UnauthorizedError("Refresh token is required");
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
    }
    catch (error) {
        throw new UnauthorizedError("Invalid refresh token");
    }
}

module.exports = {generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken};
