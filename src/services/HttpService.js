import axios from 'axios';
export default class HttpService {

    constructor(baseUrl = "http://192.168.1.77") {
        this.baseUrl = baseUrl;
    }

    makeGet(route) {
        const endpoint = this.getEndpoint(route);
        return axios.get(endpoint).then(res => {
            return Promise.resolve(res.data.data);
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        });
    }

    makePost(route, body, isFormData = false) {
        const endpoint = this.getEndpoint(route);
        const headers = this.getHeaders(isFormData);
        return axios.post(endpoint, body, {headers: headers}).then(res => {
            return Promise.resolve(res.data.data);
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        });
    }

    makePut(route, body) {
        const endpoint = this.getEndpoint(route);
        const headers = this.getHeaders(false);
        return axios.put(endpoint, body, { headers: headers }).then(res => {
            return Promise.resolve(res.data.data);
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        });
    }

    makeDelete(route, body = {}) {
        const endpoint = this.getEndpoint(route);
        const headers = this.getHeaders(false);
        return axios.delete(endpoint, body, { headers: headers }).then(res => {
            return Promise.resolve(res.data.data);
        })
        .catch(err => {
            return Promise.reject(err.response.data);
        });
    }

    getHeaders(isFormData) {
        const headers = {
            'Content-Type': (isFormData) ? 'multipart/form-data' : 'application/json',
            'Accept': 'application/json'
        }
        return headers;
    }

    getEndpoint(route) {
        return `${baseUrl}/api/v1${route}`;
    }

}
