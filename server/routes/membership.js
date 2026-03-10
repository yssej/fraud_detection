const {isUserMemberOfAnyOrganization} = require("../controllers/membership.controller");
const router = require("express").Router();
const {authMiddleware} = require("../middlewares/auth");

router.route('/hasOrganization/:id').get(authMiddleware, isUserMemberOfAnyOrganization);

module.exports = router;
