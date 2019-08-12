import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import DefaultButton from './../components/DefaultButton';
import FormInput from './../components/FormInput';

export default class ContainerForm extends React.Component {

    constructor(props) {
        super(props);
        this.inputRefs = {
            deviceId: React.createRef(),
            height: React.createRef(),
            name: React.createRef(),
            radius: React.createRef(),
        };
    }

    render() {
        return (
            <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.OS === 'ios'? 30 : -150}
            contentContainerStyle={styles.formContainer}>

                <Text h3={true} style={styles.text}>
                    Datos del Contenedor
                </Text>
                <FormInput
                    refInput={this.inputRefs.name}
                    icon="ios-cube"
                    value={this.props.container.name}
                    onChangeText={(name) => {this.props.handleValueChange("name", name)}}
                    placeholder="Nombre (Casa / Oficina)"
                    returnKeyType="next"
                    errorMessage={
                        this.props.getError("container.name")
                    }
                    onSubmitEditing={() => {
                        this.inputRefs.height.current.input.focus()
                    }}
                />

                <FormInput
                    refInput={this.inputRefs.height}
                    icon="ios-resize"
                    value={this.props.container.height}
                    onChangeText={(height) => {this.props.handleValueChange("height", height)}}
                    placeholder="Altura del contenedor en metros"
                    returnKeyType="next"
                    errorMessage={
                        this.props.getError("container.height")
                    }
                    onSubmitEditing={() => {
                        this.inputRefs.radius.current.input.focus()
                    }}
                />

                <FormInput
                    refInput={this.inputRefs.radius}
                    icon="logo-chrome"
                    value={this.props.container.radius}
                    onChangeText={(radius) => {this.props.handleValueChange("radius", radius)}}
                    placeholder="Radio del contenedor en metros"
                    returnKeyType="next"
                    errorMessage={
                        this.props.getError("container.radius")
                    }
                    onSubmitEditing={() => {
                        this.inputRefs.deviceId.current.input.focus()
                    }}
                />

                <FormInput
                    refInput={this.inputRefs.deviceId}
                    icon="logo-rss"
                    value={this.props.container.device_id}
                    onChangeText={(device_id) => {this.props.handleValueChange("device_id", device_id)}}
                    placeholder="ID del dispositivo (opcional)"
                    returnKeyType="next"
                    errorMessage={
                        this.props.getError("container.device_id")
                    }
                    onSubmitEditing={() => {
                        this.props.action();
                    }}
                />

                <DefaultButton 
                    loading={this.props.loading}
                    title={this.props.buttonTitle}
                    icon={this.props.buttonIcon}
                    onPress={this.props.action}
                />

            </KeyboardAvoidingView>
        );
    }

}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        color: "#fff"
    }
});

ContainerForm.defaultProps = {
    buttonTitle: 'Crear Contenedor',
    buttonIcon: 'ios-add-circle'
}