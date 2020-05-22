import axios from 'axios';
import store from '../store/store'

// temporary
const BASE_URL = "http://localhost:9001";

class WS {

    getThesis(id) {
        console.log(store.getState().config.authorization)

        return axios.get(`${BASE_URL}/thesis/${id}`, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        });
    }

    postThesis(id, thesis) {
        return axios.post(`${BASE_URL}/thesis/${id}`, thesis, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        })
    }
}

export default new WS();