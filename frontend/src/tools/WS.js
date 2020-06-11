import axios from 'axios';
import store from '../store/store'

// temporary
const BASE_URL = "http://192.168.0.21:8088";

class WS {

    getThesis(id) {
        return axios.get(`${BASE_URL}/thesis/${id}`, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        });
    }

    postThesisDetails(id, thesis, subjectMatter, organizationalUnit, abstract, keywords) {
        return axios.post(`${BASE_URL}/thesis/${id}/thesis-details`, {
            "id": thesis.id,
            "abstract": abstract,
            "keywords": keywords,
            "subjectMatter": subjectMatter,
            "organizationalUnit": organizationalUnit
        }, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        })
    }

    postReview1(thesis, review, grade) {
        return axios.post(`${BASE_URL}/thesis/${thesis.id}/review1`, {
            "id": thesis.id,
            "text": review,
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
            "text": review,
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
            "grade": parseFloat(grade)
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

    getThesesByAdvancedSearch(thesisType, author, reviewer, memberOfTheCommission, keyword, defenseDateFrom, defenseDateTo,
        publicationDateFrom, publicationDateTo) {
        return axios.get(`${BASE_URL}/searchTheses`, {
            params: {
                type: thesisType,
                author: author,
                reviewer: reviewer,
                memberOfTheCommission: memberOfTheCommission,
                keyword: keyword,
                defenseDateFrom: defenseDateFrom,
                defenseDateTo: defenseDateTo,
                publicationDateFrom: publicationDateFrom,
                publicationDateTo: publicationDateTo,
                query: ''
            }
        });
    }

    getThesesByBasicSearch(query) {
        return axios.get(`${BASE_URL}/searchTheses`, {
            params: {
                query: query,
                type: '',
                author: '',
                reviewer: '',
                memberOfTheCommission: '',
                keyword: '',
                defenseDateFrom: '',
                defenseDateTo: '',
                publicationDateFrom: '',
                publicationDateTo: '',
            }
        });
    }


    getPerson(personId) {
        return axios.get(`${BASE_URL}/person/${personId}`)
    }

    getDashboardData() {
        return axios.get(`${BASE_URL}/dashboard-info`, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        })
    }

    postDefenseDate(thesis, date) {
        return axios.post(`${BASE_URL}/thesis/${thesis.id}/defense-date`, {
            "date": date
        })
    }

    postNewThesis(thesisData) {
        return axios.post(`${BASE_URL}/thesis`, thesisData, {
            headers: {
                'Authorization': store.getState().config.authorization
            }
        });
    }

    postReviewers(thesis, reviewers) {
        return axios.post(`${BASE_URL}/thesis/${thesis.id}/reviewers`, reviewers);
    }

    getStaffPersons() {
        return axios.get(`${BASE_URL}/staff-persons`);
    }

    postCommittee(thesis, committee) {
        return axios.post(`${BASE_URL}/thesis/${thesis.id}/committee`, committee)
    }
}

export default new WS();