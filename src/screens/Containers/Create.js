import React from 'react';
import  { connect } from 'react-redux';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements'
import DefaultScrollView from '../../components/DefaultScrollView';
import FormInput from '../../components/FormInput';
import colorPalette from './../../components/ColorPalette';
import Container from '../../models/Container';
import DefaultButton from '../../components/DefaultButton';

class CreateScreen extends React.Component {

    state = {
        container: new Container(),
        errors: {

        }
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
                            (typeof this.state.errors.name !== undefined) ? null : "El nombre del contenedor no puede estar vacio"
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
                            (typeof this.state.errors.name !== undefined) ? null : "El nombre del contenedor no puede estar vacio"
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
                            (typeof this.state.errors.name !== undefined) ? null : "El nombre del contenedor no puede estar vacio"
                        }
                        onSubmitEditing={() => {
                        }}
                    />

                    <DefaultButton 
                        loading={false}
                        title={"Crear Contenedor"}
                        icon="ios-add-circle"
                        onPress={() => {console.log("Creating")}}
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
        borderTopWidth: 1,
        borderBottomWidth: 1,
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

export default connect(null, null)(CreateScreen);