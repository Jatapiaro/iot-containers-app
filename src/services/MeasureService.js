export default class MeasureService {

    constructor(httpService) {
        this.httpService = httpService;
        this.route = "/containers";
    }

    /**
     * Get the measures of the given container
     * 
     * @param Container container to get the measures
     */
    index(container) {
        const route = `${this.route}/${container.id}/measures`;
        return this.httpService.makeGet(route)
            .then((res) => {
                return Promise.resolve(res);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

}