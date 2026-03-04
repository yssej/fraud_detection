const { verifyAccessToken } = require("../utils/jwt");
const UnauthorizedError = require("../middlewares/errors/UnauthorizedError");
const asyncHandler = require("./asyncHandler")

const authMiddleware = asyncHandler(async(req, res, next) => {
    const accessToken = req.cookies.accessToken;
    if(!accessToken) throw new UnauthorizedError("Authentification is required");
    req.user = verifyAccessToken(accessToken);
    next();

    // const authHeader = req.headers.authorization;
    // if(!authHeader || !authHeader.startsWith("Bearer ")) throw new UnauthorizedError("Authentification is required");
    // const token = authHeader.split(' ')[1];
    // if(!token) throw new UnauthorizedError("Authentification is required");
    // req.user = verifyAccessToken(token);
    // next();
});

module.exports = authMiddleware;
