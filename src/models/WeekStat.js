export default class WeekStat {

    constructor() {
        this.labels = ['DOM','LUN','MAR','MIE','JUE','VIE','SAB'];
        this.data = [0,0,0,0,0,0,0];
        //this.initData();
    }

    /**
     * Initialize the data. This stat needs 23 slots
     * and 23 labels that matches with each hour of the day
     */
    initData() {
        for (let i = 0; i <= 23; i++) {
            let label = (i < 10)? `${i}0:00` : `${i}:00`;
            this.labels.push(label);
            this.data.push(0);
        }
    }

    /**
     * Converts the stat model to an object to be passed
     * to the chart library
     */
    getChartDataObject() {
        return {
            data: this.getChartData(),
            height: 300,
            table: this.getTableData(),
            width: 400
        }
    }

    /**
     * Converts the data to the format that will be
     * valid for the charts library
     */
    getChartData() {
        return {
            labels: this.labels,
            datasets: [{
                data: this.data
            }]
        };
    }

    /**
     * Returns the data formatted for a table
     */
    getTableData() {
        return {
            head: ['Día', 'Volumen'],
            data: this.getTableColumns()
        }
    }
    
    /**
     * Return the data as columns to be rendered 
     * in a table
     */
    getTableColumns() {
        let columns = [];
        for (let i = 0; i < this.labels.length; i++) {
            columns.push([
                this.labels[i], 
                `${this.data[i].toFixed(2)} litros`
            ]);
        }
        return columns;
    }

    fillWithResponseData(res) {
        res.map((h) => this.data[h.day-1] = h.volume);
    }

}