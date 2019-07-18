import axios from 'axios';
export default class OauthService {

    constructor(route="http://192.168.1.81") {
        this.route = `${route}/oauth/token`;
    }

    authorize(username, password) {
        const headers = this.getHeaders();
        const body = this.getBody(username, password);
        return axios.post(this.route, body, {headers: headers})
            .then(res => {
                console.log(res.data);
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response.data);
            });
    }

    getBody(username, password) {
        const body = {
            "grant_type": "password",
            "client_id": 1,
            "client_secret": "PECqI8C4abqkwqpsErcsX2SNCDErgHNqaxYrlPfS",
            "username": username,
            "password": password,
            "scope": ""
        };
        return body;
    }

    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        return headers;
    }

}
