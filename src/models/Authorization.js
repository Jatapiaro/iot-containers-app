export default class Authorization {

    constructor(responseData) {
        this.access_token = responseData.access_token;
        this.expires_in = responseData.expires_in;
        this.refresh_token = responseData.refresh_token;
        this.token_type = responseData.token_type;
        this.full_token = `${this.token_type} ${this.access_token}`;
    }

}