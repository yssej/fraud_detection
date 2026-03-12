const {isUserMemberOfAnyOrganization, joinOrganization} = require("../controllers/membership.controller");
const router = require("express").Router();
const {authMiddleware} = require("../middlewares/auth");

router.route('/hasOrganization/:id').get(authMiddleware, isUserMemberOfAnyOrganization);
router.route('/join/:organizationId').post(authMiddleware, joinOrganization);

module.exports = router;
