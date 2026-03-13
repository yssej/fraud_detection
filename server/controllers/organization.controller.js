const asyncHandler = require('../middlewares/asyncHandler');
const organisationService = require('../services/organization.service')

const createOrganization = asyncHandler(async (req, res, next) => {
    console.log('name = ', req.body)
    const {name} = req.body;
    const {id} = req.user;
    await organisationService.create(id,name);
    res.status(201).json({"message": "Organization created successfully."});
});

const isNameTaken = asyncHandler(async (req, res, next) => {
    const {name} = req.params;
    const isTaken = await organisationService.isNameTaken(name);
    res.json({isTaken});
});

const findAllNames = asyncHandler(async (req, res, next) => {
    const organizations = await organisationService.findAllNames();
    res.json(organizations);
});

module.exports = {
    createOrganization,
    isNameTaken,
    findAllNames
}
