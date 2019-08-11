import React from 'react';
import { StyleSheet, Platform } from 'react-native';

// Custom component
import DefaultScrollView from '../../components/DefaultScrollView';
import colorPalette from './../../components/ColorPalette';
import DefaultButton from '../../components/DefaultButton';
import FormInput from '../../components/FormInput';

// Models
import Container from '../../models/Container';

// Navigation
import { Navigation } from 'react-native-navigation';

// Redux
import  { connect } from 'react-redux';
import { setContainer } from './../../store/actions/Index';
import ContainerForm from '../../components/ContainerForm';

class CreateScreen extends React.Component {

    constructor(props){
        super(props);
    }
    state = {
        container: new Container(),
        errors: {
        },
        loading: false
    }

    getError = (name) => {
        if (this.state.errors[name]) {
            return this.state.errors[name].join('. ');
        }
        return null;
    }

    /**
     * Handles the value change of an input
     * @param {*} name of the object property
     * @param {*} value to set to that property
     */
    handleValueChange = (name, value) => {
        let container = this.state.container;
        container[name] = value;
        this.setState({ container: container });
    }

    /**
     * Sends the container data to the backend
     */
    storeContainer = () => {
        this.setState({loading: true});
        this.props.containerService.store(this.state.container)
            .then(res => {
                this.props.setContainer(res);
                this.setState({loading: true});
                Navigation.pop(this.props.componentId);
            })
            .catch(err => {
                console.log(err.errors);
                this.setState({
                    errors: err.errors,
                    loading: false
                });
            });
    }

    /**
     * Renders the screen
     */
    render() {
        return (
            <DefaultScrollView style={styles.container}>
            
                <ContainerForm
                    action={this.storeContainer}
                    container={this.state.container}
                    getError={this.getError}
                    handleValueChange={this.handleValueChange}
                    loading={this.state.loading}
                />

            </DefaultScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 20,
        paddingTop: 20,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: colorPalette.orange,
        borderBottomColor: colorPalette.orange
    }
});

const mapDispatchToProps = dispatch => {
    return {
        setContainer: (container) => dispatch(setContainer(container))
    };
};
export default connect(null, mapDispatchToProps)(CreateScreen);