import API from "../API/axios.config.js";

class MembershipService {
    async isUserMemberOfAnyOrganization(userId) {
        return await API.get(`/membership/hasOrganization/${userId}`);
    }
}
export default new MembershipService();
