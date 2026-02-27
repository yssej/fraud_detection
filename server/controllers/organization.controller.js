const asyncHandler = require('../middlewares/asyncHandler');
const organisationService = require('../services/organization.service')

const createOrganization = asyncHandler(async (req, res, next) => {
    const {name} = req.body;
    const organizationData = {name};
    await organisationService.create(organizationData);
    res.status(201).json({"message": "Organization created successfully."});
});

module.exports = {
    createOrganization
}
