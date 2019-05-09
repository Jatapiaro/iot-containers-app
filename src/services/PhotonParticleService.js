import axios from 'axios';

export default class PhotonParticleService {

    constructor() {
        this.route = "https://api.particle.io";
        this.productSlug = "containers-v100";
        this.clientId = "containers-1138";
        this.clientSecret = "812bb981c362c2ac875ff3efcde333d7b2cd2708";
        this.costumerEmail = null;
    }

    claimCode() {
        const route = `${this.route}/v1/products/${this.productSlug}/device_claims`;
        return this.costumerToken()
            .then(res => {
                let token = `Bearer ${res.access_token}`;
                const headers = {
                    "Accept": "application/json",
                    "Authorization": token
                };
                return axios.post(route, {}, {headers: headers})
                    .then(res => {
                        return Promise.resolve(res.data);
                    })
                    .catch(err => {
                        return Promise.reject(err.response);
                    });
            })
            .catch(err => {
                console.log(err);
            });
    }

    costumerToken() {
        const route = `${this.route}/oauth/token`;
        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }

        let body = new URLSearchParams();
        body.append("grant_type", "client_credentials");
        body.append("client_id", this.clientId);
        body.append('client_secret', this.clientSecret);
        body.append('scope', `customer=${this.costumerEmail}`);

        return axios.post(route, body, {headers: headers})
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch(err => {
                return Promise.reject(err.response);
            });
    }

    hasCostumerEmail() {
        return this.costumerEmail !== null;
    }

    setCostumerEmail(email) {
        this.costumerEmail = email;
    }

}