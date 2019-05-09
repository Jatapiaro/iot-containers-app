export default class ProfileService {

    constructor(httpService) {
        this.httpService = httpService;
        this.route = '/me';
    }

    me() {
        return this.httpService.makeGet(this.route)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

}