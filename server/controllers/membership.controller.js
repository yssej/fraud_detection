const membershipService = require('../services/membership.service');
const asyncHandler = require('../middlewares/asyncHandler')

const isUserMemberOfAnyOrganization = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const hasOrganization = await membershipService.isUserMemberOfAnyOrganization(id);
    res.json({hasOrganization});
});

const joinOrganization = asyncHandler(async (req, res, next) => {
    const userId = req.user.id;
    const organizationId = req.params.organizationId;
    await membershipService.joinOrganization(userId, organizationId);
    res.status(201).json({"message": "User joined organization successfully."});
})

module.exports = {isUserMemberOfAnyOrganization, joinOrganization};
