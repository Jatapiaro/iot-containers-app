import NodeRSA from 'node-rsa';
export default class SoftapService {

    constructor() {
        this.ap_url = 'http://192.168.0.1:80';
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

}