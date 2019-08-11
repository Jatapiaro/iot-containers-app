export default class DayStat {

    constructor() {
        this.labels = [];
        this.data = [];
        this.initData();
    }

    initData() {
        for (let i = 0; i <= 23; i++) {
            let label = (i < 10)? `${i}0:00` : `${i}:00`;
            this.labels.push(label);
            this.data.push(0);
        }
    }

    getChartData() {
        return {
            labels: this.labels,
            datasets: [{
                data: this.data
            }]
        };
    }

    fillWithResponseData(res) {
        res.map((h) => this.data[h.hour] = h.volume);
    }

}