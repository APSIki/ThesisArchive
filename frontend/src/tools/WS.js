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

    postAbstractAndKeywords(id, thesis) {
        return axios.post(`${BASE_URL}/thesis/${id}/abstract-keywords`, {
            "id": thesis.id,
            "abstract": thesis.abstract,
            "keywords": thesis.keywords
        }, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        })
    }

    postReview1(thesis, review, grade) {
        return axios.post(`${BASE_URL}/thesis/${thesis.id}/review1`, {
            "id": thesis.id,
            "review": review,
            "grade": grade
        }, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        })
    }

    postReview2(thesis, review, grade) {
        return axios.post(`${BASE_URL}/thesis/${thesis.id}/review2`, {
            "id": thesis.id,
            "review": review,
            "grade": grade
        }, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        })
    }

    postDefenseGrade(thesis, grade) {
        return axios.post(`${BASE_URL}/thesis/${thesis.id}/defense`, {
            "defended": "true",
            "grade": grade
        }, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        })
    }

    postFilePath(thesis, path) {
        return axios.post(`${BASE_URL}/thesis/${thesis.id}/file`, {
            "path": path
        }, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        })
    }
    
    getUsers() {
        return axios.get(`${BASE_URL}/users`);
    }

    getTheses() {
        return axios.get(`${BASE_URL}/theses`, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        })
    }

    getThesisBySearch(titleOrAuthorName) {
        return axios.get(`${BASE_URL}/searchTheses`);
    }

    getPerson(personId) {
        return axios.get(`${BASE_URL}/person/${personId}`)
    }
}

export default new WS();