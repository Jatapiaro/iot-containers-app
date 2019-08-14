export default class Measure {

    constructor() {
        this.labels = [];
        this.data = [];
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
            head: ['Medida', 'Volumen'],
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
        
        for (let i=0;i<10;i++){
            this.data.push(res[0][i].volume);
            this.labels.push(`Medida ${res[0][i].id}`);
        }
        //res.map((h) => this.data[h.id-1] = h.volume);
    }

}