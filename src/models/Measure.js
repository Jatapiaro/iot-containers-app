import moment from 'moment';
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
        if (res.length === 0) {
            return;
        }
        res.map((m) => {
            this.tableObject.data.push(
                [
                    `${m.volume.toFixed(2)} litros`,
                    moment(m.created_at).lang('es').format('lll')
                ]
            )
        });
    }

}