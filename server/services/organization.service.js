const BadRequestError = require('../middlewares/errors/BadRequestError')
const {Organization} = require("../models/Membership");

const isNameTaken = async (name) => {
    const organization = await Organization.findOne({ where: {name}});
    console.log('organization = ', organization);
    return !!organization;
}

const create = async (organizationData) => {
    if(!organizationData.name) throw new BadRequestError('Organization name is required.');
    if(await isNameTaken(organizationData.name)) throw new BadRequestError('Organization name already taken.');
    Organization.create(organizationData);
}

module.exports = {
    create
};
