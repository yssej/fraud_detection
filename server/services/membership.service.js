const {Membership} = require('../models/membership');

const isUserMemberOfAnyOrganization = async (userId) => {
    const membership = await Membership.count({where: {userId}});
    return membership !== 0;
}

const joinOrganization = async (userId, organizationId) => {
    await Membership.create({userId, organizationId, role: 'Analyst'});
}

module.exports = {isUserMemberOfAnyOrganization, joinOrganization};
