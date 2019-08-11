import React from 'react';
import { Picker, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { BarChart } from 'react-native-chart-kit';

// Custom Components
import colorPalette from './../../components/ColorPalette';

// Models
import DayStat from './../../models/DayStat';

const chartConfig = {
    backgroundGradientFrom: colorPalette.darkBlue,
    backgroundGradientTo: colorPalette.darkBlue,
    color: (opacity = 1) => `rgba(252, 255, 255, ${opacity})`,
    strokeWidth: 3
}

class StatsScreen extends React.Component {

    state = {
        dayStat: new DayStat(),
        range: 'day'
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
             */
            this.setState({
                dayStat: dayStat,
                // TODO add week stat,
                // TODO add month stat,
                // TODO add year stat
            });

        })
        .catch((err) => {
            console.log(err);
        });
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
                        this.setState({range: itemValue})
                    }>
                    <Picker.Item label="Por Día" value="day" />
                    <Picker.Item label="Por Semana" value="week" />
                    <Picker.Item label="Por Mes" value="month" />
                    <Picker.Item label="Por Año" value="year" />
                </Picker>
                <ScrollView style={styles.horizontalContainer} horizontal={true}>
                    <BarChart
                        data={this.state.dayStat.getChartData()}
                        width={2500}
                        height={350}
                        yAxisLabel={'Vol: '}
                        style={styles.graphStyle}
                        chartConfig={chartConfig}
                    />
                </ScrollView>
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
    text: {
        color: colorPalette.white
    },
    textCentered: {
        textAlign: 'center'
    },
});

export default StatsScreen;