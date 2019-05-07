export default class ContainerService {

    constructor(httpService) {
        this.httpService = httpService;
        this.route = "/containers";
    }

    all() {
        return this.httpService.makeGet(this.route)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            })
    }

}