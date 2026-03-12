import API from "../API/axios.config.js";

class OrganizationService {
    async create(name) {
        return await API.post('/organization', { name });
    }

    async isNameTaken(name) {
        return await API.get(`/organization/isNameTaken/${name}`);
    }

    async findAllNames() {
        return await API.get('/organization/allNames');
    }
}

export default new OrganizationService();
