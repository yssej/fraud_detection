import API from "../API/axios.config.js";

class AuthService {
    async login(emailOrUsername, password) {
        const { data } = await API.post('/auth/login', { emailOrUsername, password });
        return data;
    }

    async getCurrentUser() {
        return await API.get('/users/profile');
    }

    logout() {
        localStorage.removeItem('RISK_MONITOR_token');
    }
}
export default new AuthService();
