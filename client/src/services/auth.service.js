import API from "../API/axios.config.js";

class AuthService {
    async login(emailOrUsername, password) {
        const { response } = await API.post('/auth/login', { emailOrUsername, password });
        return response.json();
    }

    getCurrentUser() {
        return API.get('/auth/profile/');
    }

    logout() {
        localStorage.removeItem('RISK_MONITOR_token');
    }
}
export default new AuthService();
