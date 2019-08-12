export default class Container {

    constructor() {
        this.id = -1;
        this.name = "";
        this.device_id = "";
        this.height = "";
        this.radius = "";
        this.volume = "";
        this.dummy = true;
    }

    fillWithResponseData(res) {
        this.id = res.id;
        this.name = res.name;
        this.device_id = res.device_id;
        this.height = `${res.height}`;
        this.radius = `${res.radius}`;
        this.volume = `${res.volume}`;
        this.dummy = res.dummy;
    }

}