import API from "../API/axios.config.js";

class AuthService {
    async login(emailOrUsername, password) {
        const { data } = await API.post('/auth/login', { emailOrUsername, password });
        return data;
    }

    async register(newUser) {
        return await API.post('/auth/register', newUser);
    }

    async getCurrentUser() {
        return await API.get('/users/profile');
    }

    async logout() {
        return await API.post('/auth/logout');
    }
}
export default new AuthService();
