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

    /**
     * Store the measure of the given container
     * 
     * @param Cointainer container to store the measure
     * @param height  measure to store  
     */
    store(container, height){
        const data = this.getData(height);
        const route = `${this.route}/${container.id}/measures`;
        return this.httpService.makePost(route, data)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    getData(height) {
        return {
            measure: {
                height: height
            }
        };
    }

}