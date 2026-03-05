const { verifyAccessToken, verifyRefreshToken} = require("../utils/jwt");
const UnauthorizedError = require("../middlewares/errors/UnauthorizedError");
const asyncHandler = require("./asyncHandler")

const authMiddleware = asyncHandler(async(req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if(!accessToken) throw new UnauthorizedError("Authentification is required");
    try {
        req.user = verifyAccessToken(accessToken);
        next();
    } catch (error) {
        throw new UnauthorizedError("Invalid access token");
    }

    // const authHeader = req.headers.authorization;
    // if(!authHeader || !authHeader.startsWith("Bearer ")) throw new UnauthorizedError("Authentification is required");
    // const token = authHeader.split(' ')[1];
    // if(!token) throw new UnauthorizedError("Authentification is required");
    // req.user = verifyAccessToken(token);
    // next();
});

const refreshMiddleware = asyncHandler(async(req, res, next) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) throw new UnauthorizedError("Authentification is required because of refresh token");
    try {
        req.user = verifyRefreshToken(refreshToken);
        next();
    } catch (error) {
        throw new UnauthorizedError("Invalid refresh token");
    }
})

module.exports = {authMiddleware, refreshMiddleware};
