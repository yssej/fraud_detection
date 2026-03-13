const BadRequestError = require('../middlewares/errors/BadRequestError')
const {Organization, Membership } = require("../models/Membership");
const sequelize = require('../config/database');

const isNameTaken = async (name) => {
    const organization = await Organization.findOne({ where: {name}});
    console.log('organization = ', organization);
    return !!organization;
}

const create = async (userId, name) => {
    if(!name) throw new BadRequestError('Organization name is required.');
    if(await isNameTaken(name)) throw new BadRequestError('Organization name already taken.');
    return sequelize.transaction(async (t) => {
        const organization = await Organization.create({name}, { transaction: t });

        await Membership.create({
            userId: userId,
            organizationId: organization.id,
            role: 'Admin'
        }, { transaction: t });
    });
}

const findAllNames = async () => {
    const organizations = await Organization.findAll({ attributes: ['name'] });
    return organizations.map(org => org.name);
}

module.exports = {
    create,
    isNameTaken,
    findAllNames
};
