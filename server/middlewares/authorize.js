const ForbiddenError = require("./errors/ForbiddenError");

const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        const userRoles = req.user.roles
        const hasPermission = userRoles.some(role => allowedRoles.includes(role));
        if(!hasPermission) throw new ForbiddenError("Access denied.");
        next();
    }
}

module.exports = authorizeRoles;
