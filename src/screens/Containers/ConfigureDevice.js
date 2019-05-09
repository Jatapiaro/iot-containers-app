import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Icon, Text } from 'react-native-elements';
import { KeyboardAvoidingView, View, Picker, StyleSheet } from 'react-native';

// Custom components
import FormInput from '../../components/FormInput';
import DefaultButton from '../../components/DefaultButton';
import colorPalette from './../../components/ColorPalette';
import DefaultScrollView from '../../components/DefaultScrollView';

class ConfigureDeviceScreen extends React.Component {

    state = {
        connectedToPhoton: false,
        deviceId: -1,
        networks: [],
        displayNetworks: false,
        networkIndex: -1,
        password: ""
    }

    constructor(props) {
        super(props);
        // Bind navigation events
        Navigation.events().bindComponent(this);
    }

    componentWillMount() {
        //console.log(this.props.claimCode);
        /**
         * We need to check if the user is connected to the photon
         * we have to execute a function until the phone is connected
         * to the photon
         */
        this.connectToPhoton();
    }

    connectToPhoton() {
        this.props.softapService.deviceId()
            .then(res => {
                this.setState({
                    connectedToPhoton: true,
                    deviceId: res.id,
                });
                this.props.softapService.setClaimCode(this.props.claimCode);
                this.props.softapService.scanNetworks()
                    .then(res => {
                        this.setState({
                            networks: res.scans,
                            displayNetworks: true
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                console.log(err);
                this.connectToPhoton();
            });
    }

    connectToWifi = () => {
        let network = this.state.networks[this.state.networkIndex];
        alert(network.ssid + " : " + network.sec + " : " + network.ch);
        this.props.softapService.connectToNetwork(network.ssid, network.sec, network.ch, this.state.password)
            .then((res) => {
                //this.setState({password: res});
                alert("Configurado");
            })
            .catch(err => {
                alert(JSON.stringify(err));
            });
    } 

    /**
     * Handler of some navigation button presses
     * @param {*} navigationEvent of the pressed button
     */
    navigationButtonPressed(navigationEvent) {
        if (navigationEvent.buttonId === "cancelDeviceConfiguration") {
            Navigation.dismissModal(this.props.componentId);
        }
    }

    render() {
        return (
            <DefaultScrollView style={styles.screenContainer}>
                {
                    this.state.connectedToPhoton === false &&
                    <View style={styles.conainer}>
                        <View>
                            <Text h3={true} style={[styles.text, styles.centerText]}>Instrucciones</Text>
                            <Icon
                                name='ios-wifi'
                                type='ionicon'
                                color='#fff'
                                size={50}
                            />
                        </View>
                        <Text h5={true} style={styles.text}>1. Entra a la configuración de tu teléfono</Text>
                        <Text h5={true} style={styles.text}>2. Entra a la configuración de redes Wi-fi</Text>
                        <Text h5={true} style={styles.text}>3. Conectate a la red del dispositivo (Photon-XXXX)</Text>
                        <Text h5={true} style={styles.text}>4. Puede que tu celular no ponga el símbolo de wifi aún cuando estes conectado al dispositivo</Text>
                        <Text h5={true} style={styles.text}>5. Regresa a la aplicación</Text>
                        <Text h5={true} style={styles.text}>6. Espera unos segundos para que la aplicación detecte que te has conectado al dispositivo</Text>
                        <Text h5={true} style={styles.text}>7. Una vez que estes conectado, selecciona tu red en el menú y e introduce las credenciales para que el dispositivo pueda conectarse</Text>
                        <Text h5={true} style={styles.text}>8. Si quieres cancelar la configuración, oprime el botón de la esquina superior izquierda. Regresa a la configuración de tu dispositivo, y selecciona nuevamente tu red wi-fi. Esto es necesario debido a que antes de ir a la configuración la aplicación debe solicitar un código para poder enviarlo al dispositivo.</Text>
                    </View>
                }
                {
                    this.state.connectedToPhoton === true &&
                    <KeyboardAvoidingView behavior="position" style={{flex: 1}}>
                        <View>
                            <Text h3={true} style={[styles.text, styles.centerText]}>Selecciona tu red</Text>
                            <Icon
                                name='ios-wifi'
                                type='ionicon'
                                color='#fff'
                                size={50}
                            />
                            {
                                this.state.displayNetworks === true &&
                                <Picker
                                    selectedValue={this.state.networkIndex}
                                    style={styles.picker}
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.setState({networkIndex: itemIndex})
                                    }>
                                    {
                                        this.state.networks.map((net, i) => 
                                            <Picker.Item 
                                                style={styles.picker} 
                                                color={this.state.networkIndex === i? colorPalette.orange : colorPalette.white} 
                                                label={net.ssid}
                                                value={i} key={i}
                                            />
                                        )
                                    }
                                </Picker>
                            }
                            {
                                this.state.networkIndex !== -1 &&
                                <FormInput
                                    icon="md-key"
                                    value={this.state.password}
                                    onChangeText={(password) => {this.setState({"password": password})}}
                                    placeholder="Contraseña de Wi-fi"
                                    returnKeyType="next"
                                    errorMessage={
                                        null
                                    }
                                    onSubmitEditing={() => {
                                    }}
                                />
                            }
                            {
                                this.state.password.length > 0 &&
                                <DefaultButton 
                                    loading={false}
                                    title={"Conectar"}
                                    icon="ios-wifi"
                                    onPress={this.connectToWifi}
                                />
                            }
                        </View>
                    </KeyboardAvoidingView>
                }
            </DefaultScrollView>
        );
    }

}

const styles = StyleSheet.create({
    screenContainer: {
        padding: 20,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: colorPalette.orange,
        borderBottomColor: colorPalette.orange
    },
    conainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        color: colorPalette.white
    },
    centerText: {
        textAlign: 'center'
    },
    text: {
        color: colorPalette.white
    },
    picker: {
        color: colorPalette.white,
        width: "100%",
    }
});

export default ConfigureDeviceScreen;
