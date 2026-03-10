const membershipService = require('../services/membership.service');
const asyncHandler = require('../middlewares/asyncHandler')

const isUserMemberOfAnyOrganization = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const hasOrganization = await membershipService.isUserMemberOfAnyOrganization(id);
    res.json({hasOrganization});
});

module.exports = {isUserMemberOfAnyOrganization};
