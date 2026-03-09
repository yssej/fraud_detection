import API from "../API/axios.config.js";

class MembershipService {
    async isUserMemberOfAnyOrganization() {
        return await API.get(`/membership/hasOrganization`);
    }
}
export default new MembershipService();
