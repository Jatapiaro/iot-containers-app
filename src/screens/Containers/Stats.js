import React from 'react';
import { Dimensions, Picker, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { BarChart } from 'react-native-chart-kit';
import { Table, Row, Rows } from 'react-native-table-component';


// Custom Components
import colorPalette from './../../components/ColorPalette';

// Models
import DayStat from './../../models/DayStat';

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
    backgroundGradientFrom: colorPalette.darkBlue,
    backgroundGradientTo: colorPalette.darkBlue,
    color: (opacity = 1) => `rgba(252, 255, 255, ${opacity})`,
    strokeWidth: 3
}


class StatsScreen extends React.Component {

    state = {
        dayStat: new DayStat(),
        range: 'day',
        chartData: {
            data: {
                labels: [],
                datasets: [{
                    data: []
                }]
            },
            height: 300,
            table: {
                head: [],
                data: []
            },
            width: 2500,
        }
    }

    componentWillMount() {
        /**
         * Promise.all will wait until all the promises 
         * inside the array are complete. 
         * Then we access the promises as res[0] where the index
         * is the same as the order of the promises we sent
         */
        Promise.all([
            this.props.statService.getStat(this.props.container)
        ])
        .then((res) => {

            let dayStat = this.state.dayStat;
            dayStat.fillWithResponseData(res[0]);

            /**
             * Update the entire state
             * Also we assign the day stat as the default stat
             */
            this.setState({
                dayStat: dayStat,
                // TODO add week stat,
                // TODO add month stat,
                // TODO add year stat
                chartData: dayStat.getChartDataObject()
            });

        })
        .catch((err) => {
            console.log(err);
        });
    }

    /**
     * Shows the chart for the specified range
     */
    reloadChart = (range) => {
        switch(range) {
            case 'day':
                this.setState({
                    range: range,
                    chartData: this.state.dayStat.getChartDataObject()
                });
                break;
            case 'week':
                this.setState({
                    range: range,
                    //TODO: add the week data
                });
                break;
            case 'month':
                this.setState({
                    range: range,
                    //TODO: add the monthStat data
                });
                break;
            case 'year':
                this.setState({
                    range: range,
                    //TODO: add the yearStat data
                });
                break;
        }
    }
    
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text h4={true} style={[styles.text, styles.textCentered]}>
                    {this.props.container.name}
                </Text>
                <Picker
                    selectedValue={this.state.range}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    onValueChange={(itemValue) =>
                        this.reloadChart(itemValue)
                    }>
                    <Picker.Item label="Por Día" value="day" />
                    <Picker.Item label="Por Semana" value="week" />
                    <Picker.Item label="Por Mes" value="month" />
                    <Picker.Item label="Por Año" value="year" />
                </Picker>
                <ScrollView style={styles.horizontalContainer} horizontal={true}>
                    <BarChart
                        chartConfig={chartConfig}
                        data={this.state.chartData.data}
                        height={this.state.chartData.height}
                        style={styles.graphStyle}
                        width={this.state.chartData.width}
                        yAxisLabel={'Vol: '}
                    />
                </ScrollView>
                <Table style={{marginBottom: 50}} borderStyle={styles.tableBorder}>
                    <Row data={this.state.chartData.table.head} style={styles.tableHead} textStyle={[styles.tableText, styles.tableBoldText]}/>
                    <Rows data={this.state.chartData.table.data} textStyle={styles.tableText}/>
                </Table>
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: colorPalette.darkBlue,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: colorPalette.orange,
        borderBottomColor: colorPalette.orange
    },
    horizontalContainer: {
        marginTop: 20,
        marginBottom: 20
    },
    graphStyle: {
        width: 2500,
    },
    picker: {
        color: colorPalette.white,
        width: '100%'
    },
    pickerItem: {
        color: colorPalette.white,
        height: 60,
        width: '100%'
    },
    tableBorder: {
        borderWidth: 2, 
        borderColor: '#C1C0B9'
    },
    tableHead: { 
        height: 40, 
        backgroundColor: colorPalette.orange 
    },
    tableText: { 
        margin: 6,
        color: colorPalette.white,
        textAlign: 'center'
    },
    tableBoldText: {
        fontWeight: "800"
    },
    text: {
        color: colorPalette.white,
    },
    textCentered: {
        textAlign: 'center'
    },
});

export default StatsScreen;