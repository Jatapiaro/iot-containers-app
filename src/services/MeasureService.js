export default class MeasureService {

    constructor(httpService) {
        this.httpService = httpService;
        this.route = "/containers";
    }

    /**
     * Get the measures of the given container
     * 
     * @param Container container to get the stats 
     * @param {*} range of the query day|week|month|year 
     */
    getMeasures(container, range = "measures") {
        const route = `${this.route}/${container.id}/${range}`;
        return this.httpService.makeGet(route)
            .then((res) => {
                return Promise.resolve(res);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

}