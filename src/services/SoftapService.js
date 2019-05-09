import axios from 'axios';
import RSAKey from 'react-native-rsa';

export default class SoftapService {

    constructor() {
        this.ap_url = 'http://192.168.0.1';
        this.ping_timeout = 500;
        this.open = 0;
        this.wep_psk = 1;
        this.wep_shared = 32769;
        this.wpa_aes_psk = 2097156;
        this.wpa_tkip_psk = 2097154;
        this.wpa2_aes_psk = 4194308;
        this.wpa2_mixed_psk = 4194310;
        this.wpa2_tkip_psk = 419430;
    }

    /**
     * Get the device id
     */
    deviceId() {
        const headers = this.getHeaders();
        const route = `${this.ap_url}/device-id`;
        return axios.get(route, {headers: headers, timeout: 1000})
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    /**
     * Scan networks closer to you
     */
    scanNetworks() {
        const headers = this.getHeaders();
        const route = `${this.ap_url}/scan-ap`;
        return axios.get(route, {headers: headers})
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    connectToNetwork(ssid, security, ch, password) {
        return this.getPublicKey()
            .then(res => {
                
                const b = res.b;

                const keyModString = b.slice(28 * 2, 157 * 2);
                const keyExpString = b.slice(159 * 2, 162 * 2);
                let rsa = new RSAKey();
                const publicKey = {
                  n: keyModString,
                  e: keyExpString
                };
                publicKeyString = JSON.stringify(publicKey);
                rsa.setPublicString(publicKeyString);
                let encryptedPassword = rsa.encrypt(password);

                const headers = {
                    "Content-Type": "application/x-www-form-urlencoded"
                };
        
                let body = {
                    "ssid": ssid,
                    "sec": security,
                    "idx": 0,
                    "ch": ch,
                    "pwd": encryptedPassword
                };

                return axios.post(`${this.ap_url}/configure-ap`, JSON.stringify(body), {headers: headers})
                    .then(res => {
                        const headers2 = {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                        let body2 = {idx: 0}
                        return axios.post(`${this.ap_url}/connect-ap`, JSON.stringify(body), {headers: headers})
                            .then(res => {
                                alert(JSON.stringify(res));
                                return Promise.resolve(res);
                            })
                            .catch(err => {
                                return Promise.reject(err);
                            });
                    })
                    .catch(err => {
                        return Promise.reject(err);
                    });
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }
    
    setClaimCode(cc) {
        const route = `${this.ap_url}/set`;
        const headers = {
            "Content-Type": "application/x-www-form-urlencoded"
        };
        let body = new URLSearchParams();
        body.append("k", 'cc');
        body.append("v", cc);
        return axios.post(route, body, headers)
            .then(res => {
                alert("Claim code setted");
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    /**
     * Get device public key
     */
    getPublicKey() {
        const headers = this.getHeaders();
        const route = `${this.ap_url}/public-key`;
        return axios.get(route, {headers: headers})
            .then(res => {
                return Promise.resolve(res.data);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    getHeaders() {
        return {
            'Accept': 'application/json'
        }
    }

}