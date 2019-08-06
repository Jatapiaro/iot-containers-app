import axios from 'axios';
import HttpService from './HttpService';
export default class OauthService {

    constructor(route="http://containers.totoringo.com") {
        this.route = `${route}/oauth/token`;
    }

    authorize(username, password) {
        const headers = this.getHeaders();
        const body = this.getBody(username, password);
        return axios.post(this.route, body, {headers: headers})
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
            "client_id": 3,
            "client_secret": "BVDPcxpkjwUnquUnEg2DYYF4q0qxVCVau8IzIYaI",
            "username": username,
            "password": password,
            "scope": ""
        };
        return body;
    }

    register(user){
        const route = "/register";
        const data = this.getRegisterBody(user);
        const httpService = new HttpService();
        return httpService.makePost(route, data)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
   
    getRegisterBody(user){
        return {
            "user":{
                 "name": user.name,
                 "email": user.email,
                 "password": user.password,
                 "password_confirmation": user.password_confirmation,
                 "client_id": 3,
                 "client_secret": "BVDPcxpkjwUnquUnEg2DYYF4q0qxVCVau8IzIYaI"
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
