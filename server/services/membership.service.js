const {Membership} = require('../models/membership');

const isUserMemberOfAnyOrganization = async (userId) => {
    const membership = await Membership.count({where: {userId}});
    return membership !== 0;
}

module.exports = {isUserMemberOfAnyOrganization};
