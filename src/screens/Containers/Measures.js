import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Table, Row, Rows } from 'react-native-table-component';


// Custom Components
import colorPalette from './../../components/ColorPalette';

// Models
import Measure from './../../models/Measure';

// Redux
import  { connect } from 'react-redux';
import { setContainerMeasures } from './../../store/actions/Index';



class MeasuresScreen extends React.Component {

    state = {
        measure: new Measure(),
    }

    componentWillMount() {
        /**
         * Promise.all will wait until all the promises 
         * inside the array are complete. 
         * Then we access the promises as res[0] where the index
         * is the same as the order of the promises we sent
         */
        this.props.measureService.index(this.props.container)
        .then((res) => {

            this.props.setContainerMeasures(this.props.container, res);
            this.props.container.measures = res;
            this.props.onPassProp(this.props.container);
            let measure = this.state.measure;
            measure.fillWithResponseData(res);

            /**
             * Update the entire state
             * Also we assign the measures 
             */
            this.setState({
                measure: measure
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
                <Table style={{marginBottom: 50, marginTop: 25}} borderStyle={styles.tableBorder}>
                    <Row data={this.state.measure.tableObject.head} style={styles.tableHead} textStyle={[styles.tableText, styles.tableBoldText]}/>
                    <Rows data={this.state.measure.tableObject.data} textStyle={styles.tableText}/>
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

const mapDispatchToProps = dispatch => {
    return {
        setContainerMeasures: (container, measures) => dispatch(setContainerMeasures(container, measures))
    };
};
export default connect(null, mapDispatchToProps)(MeasuresScreen);