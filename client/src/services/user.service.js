import API from "../API/axios.config.js";

class UserService {
    async isEmailExist(email) {
        return await API.get(`/users/isEmailTaken/${email}`);
    }

    async isUsernameExist(username) {
        return await API.get(`/users/isUsernameTaken/${username}`);
    }
}

export default new UserService();
