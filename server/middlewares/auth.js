const { verifyToken } = require("../utils/jwt");
const UnauthorizedError = require("../middlewares/errors/UnauthorizedError");
const asyncHandler = require("./asyncHandler")

const authMiddleware = asyncHandler(async(req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")) throw new UnauthorizedError("Authentification is required");
    const token = authHeader.split(' ')[1];
    req.user = verifyToken(token);
    next();
});

module.exports = authMiddleware;
