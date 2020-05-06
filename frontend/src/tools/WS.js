import axios from 'axios';

// temporary
const BASE_URL = "http://localhost:9001";

class WS {

    getThesis(id) {
        // only a mock
        return axios.get(`${BASE_URL}/thesis/${id}`);
    }

    postThesis(id, thesis) {
        return axios.post(`${BASE_URL}/thesis/${id}`, thesis)
    }
}

export default new WS();