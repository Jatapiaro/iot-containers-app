export default class Measure {

    constructor() {
        this.labels = [];
        this.data = [];
        this.tableObject = {
            head: ['Volumen', 'Hora'],
            data: []
        }
    }

    fillWithResponseData(res) {
        this.tableObject.data = [];
        for (let i = 0; i < res.length; i++) {
            let d = res[i];
            let info = [`${d.volume.toFixed(2)} litros`,  d.created_at]
            this.tableObject.data.push(info);
        }
    }

}