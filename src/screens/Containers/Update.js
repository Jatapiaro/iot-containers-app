import React from 'react';
import { StyleSheet } from 'react-native';

// Custom component
import DefaultScrollView from '../../components/DefaultScrollView';
import colorPalette from './../../components/ColorPalette';

// Models
import Container from '../../models/Container';

// Navigation
import { Navigation } from 'react-native-navigation';

// Redux
import  { connect } from 'react-redux';
import { updateContainer } from './../../store/actions/Index';
import ContainerForm from '../../components/ContainerForm';

class UpdateScreen extends React.Component {

    state = {
        container: new Container(),
        errors: {
        },
        loading: false
    }

    componentWillMount() {
        let container = this.state.container;
        container.fillWithResponseData(this.props.container);
        this.setState({
            container: container
        });
    }

    /**
     * Get the errors related to a given property
     */
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
     * Sends the new container data to the server
     */
    updateContainer = () => {
        this.props.containerService.update(this.state.container)
            .then((res) => {
                this.setState({loading: true});
                this.props.updateContainer(res);
                this.props.onPassProp(res);
                Navigation.pop(this.props.componentId, {props: {container: res}});
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    loading: false,
                    errors: err.errors
                });
            });
    }

    render() {
        return (
            <DefaultScrollView style={styles.container}>
                <ContainerForm
                    action={this.updateContainer}
                    container={this.state.container}
                    getError={this.getError}
                    handleValueChange={this.handleValueChange}
                    loading={this.state.loading}
                    buttonTitle='Actualizar Contendor'
                    buttonIcon='ios-create'
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
        updateContainer: (container) => dispatch(updateContainer(container))
    };
};
export default connect(null, mapDispatchToProps)(UpdateScreen);