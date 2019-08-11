

export default class StatService {

    constructor(httpService) {
        this.httpService = httpService;
        this.route = "/stats";
    }

    /**
     * Get the stat of the given container
     * 
     * @param Container container to get the stats 
     * @param {*} range of the query day|week|month|year 
     */
    getStat(container, range = "day") {
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