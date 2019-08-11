import axios from 'axios';
export default class OauthService {

    constructor(route = "http://containers.totoringo.com") {
        this.route = `${route}/oauth/token`;
        this.clientID = 1;
        this.clientSecret = "ztFcktqbJ0akbBV9alIOoHrwkvLE0leUlRtdbNEr";
    }

    authorize(username, password) {
        const headers = this.getHeaders();
        const body = this.getBody(username, password);
        return axios.post(this.route, body, { headers: headers })
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch((err) => {
                return Promise.reject(err.response.data);
            });
    }


    getBody(username, password) {
        const body = {
            "grant_type": "password",
            "client_id": this.clientID,
            "client_secret": this.clientSecret,
            "username": username,
            "password": password,
            "scope": ""
        };
        return body;
    }

    register(user) {
        const route = "http://containers.totoringo.com/api/v1/register";
        const data = this.getRegisterBody(user);
        const headers = this.getHeaders();
        return axios.post(route, data, { headers: headers })
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch(err => {
                return Promise.reject(err.response.data);
            });
    }

    getRegisterBody(user) {
        return {
            "user": {
                "name": user.name,
                "email": user.email,
                "password": user.password,
                "password_confirmation": user.password_confirmation,
                "client_id": this.clientID,
                "client_secret": this.clientSecret
            }
        }
    }

    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        return headers;
    }


}
