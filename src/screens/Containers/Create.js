import React from 'react';
import { Text } from 'react-native-elements'
import { KeyboardAvoidingView, StyleSheet } from 'react-native';

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

class CreateScreen extends React.Component {

    state = {
        container: new Container(),
        errors: {

        }
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
        this.setState({container: container});
    }

    /**
     * Sends the container data to the backend
     */
    storeContainer = () => {
        this.props.containerService.store(this.state.container)
            .then(res => {
                this.props.setContainer(res);
                Navigation.pop(this.props.componentId);
            })
            .catch(err => {
                console.log(err.errors);
                this.setState({
                    errors: err.errors
                });
            });
    }

    /**
     * Renders the screen
     */
    render() {
        return (
            <DefaultScrollView style={styles.container}>
                <KeyboardAvoidingView
                    behavior="position"
                    contentContainerStyle={styles.formContainer}>

                    <Text h3={true} style={styles.text}>
                        Datos del Contenedor
                    </Text>

                    <FormInput
                        icon="ios-cube"
                        value={this.state.container.name}
                        onChangeText={(name) => {this.handleValueChange("name", name)}}
                        placeholder="Nombre (Casa / Oficina)"
                        returnKeyType="next"
                        errorMessage={
                            this.getError("container.name")
                        }
                        onSubmitEditing={() => {
                        }}
                    />

                    <FormInput
                        icon="ios-resize"
                        value={this.state.container.height}
                        onChangeText={(height) => {this.handleValueChange("height", height)}}
                        placeholder="Altura del contenedor en metros"
                        returnKeyType="next"
                        errorMessage={
                            this.getError("container.height")
                        }
                        onSubmitEditing={() => {
                        }}
                    />

                    <FormInput
                        icon="logo-chrome"
                        value={this.state.container.radius}
                        onChangeText={(radius) => {this.handleValueChange("radius", radius)}}
                        placeholder="Radio del contenedor en metros"
                        returnKeyType="next"
                        errorMessage={
                            this.getError("container.radius")
                        }
                        onSubmitEditing={() => {
                        }}
                    />

                    <DefaultButton 
                        loading={false}
                        title={"Crear Contenedor"}
                        icon="ios-add-circle"
                        onPress={this.storeContainer}
                    />

                </KeyboardAvoidingView>
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
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        color: "#fff"
    }
});

const mapDispatchToProps = dispatch => {
    return {
        setContainer: (container) => dispatch(setContainer(container))
    };
};
export default connect(null, mapDispatchToProps)(CreateScreen);