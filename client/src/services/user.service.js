import API from "../API/axios.config.js";

class UserService {
    async isEmailExist(email) {
        return await API.get(`/users/isTaken/${email}`);
    }
}

export default new UserService();
