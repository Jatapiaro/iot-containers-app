export default class YearStat {

    constructor() {
        this.labels = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
        this.data = [0,0,0,0,0,0,0,0,0,0,0,0];
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
            width: 500
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
            head: ['Mes', 'Volumen'],
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
        res.map((h) => this.data[h.month-1] = h.volume);
    }

}