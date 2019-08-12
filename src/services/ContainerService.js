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
            });
    }

    store(container) {
        const data = this.getData(container);
        return this.httpService.makePost(this.route, data)
            .then(res => {
                return Promise.resolve(res);
            })
            .catch(err => {
                return Promise.reject(err);
            });
    }

    update(container) {
        const route = `${this.route}/${container.id}`;
        return this.httpService.makePut(route, data)
            .then((res) => {
                return Promise.resolve(res);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    delete(container) {
        const route = `${this.route}/${container.id}`;
        console.log(route);
        return this.httpService.makeDelete(route)
            .then((res) => {
                return Promise.resolve(res);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    }

    getData(container) {
        return {
            container: container
        }
    }

}