export default class StatService {

    constructor(httpService) {
        this.httpService = httpService;
        this.route = "/stats";
    }

}