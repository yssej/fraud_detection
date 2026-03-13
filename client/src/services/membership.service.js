import API from "../API/axios.config.js";

class MembershipService {
    async isUserMemberOfAnyOrganization(userId) {
        return await API.get(`/membership/hasOrganization/${userId}`);
    }

    async joinOrganization(organizationId) {
        return await API.post(`/membership/join/${organizationId}`);
    }
}
export default new MembershipService();
