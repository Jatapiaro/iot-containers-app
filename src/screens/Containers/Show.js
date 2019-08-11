import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

// Custom component
import DefaultScrollView from '../../components/DefaultScrollView';
import colorPalette from './../../components/ColorPalette';
import DefaultButton from '../../components/DefaultButton';

// RNNV icons
import Icon from 'react-native-vector-icons/Ionicons';

// Navigation
import { Navigation } from 'react-native-navigation';

class ShowScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    /**
     * Obtains a claim code for the current customer
     */
    getClaimCode() {
        this.props.photonParticleService.claimCode()
            .then(res => {
                let claimCode = res.claim_code;
                this.openModal(claimCode);
            })
            .catch(err => {
                console.log(err);
            });
    }
    

    /**
     * Open a modal to configure the photon particle device
     * 
     * @param {*} claimCode 
     */
    openModal(claimCode) {
        Icon.getImageSource('ios-close-circle', 30, colorPalette.danger)
        .then((res) => {
            Navigation.showModal({
                stack: {
                    children: [{
                        component: {
                            name: 'containers-app.ContainersConfigureDeviceScreen',
                            passProps: {
                                claimCode: claimCode
                            },
                            options: {
                                topBar: {
                                    title: {
                                        text: 'Configurar Dispositivo'
                                    },
                                    leftButtons: [
                                        {
                                            id: 'cancelDeviceConfiguration',
                                            icon: res
                                        }
                                    ],
                                }
                            }
                        }
                    }]
                }
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

    /**
     * Push the stats screen
     */
    pushStatsScreen = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'containers-app.ContainersStatsScreen',
                passProps: {
                    container: this.props.container
                },
                options: {
                    topBar: {
                        title: {
                            text: `Estadísticas`,
                            color: colorPalette.white
                        },
                        background: {
                            color: colorPalette.darkBlue
                        }
                    }
                }
            }
        });
    }

    /**
     * Helper to get a claim code and then
     * call the method to open the modal
     */
    showConfigureDeviceModal = () => {
        this.getClaimCode();
    }

    render() {
        return (
            <DefaultScrollView style={styles.container}>
                <Text h4={true} style={[styles.text, styles.textCentered]}>
                    {this.props.container.name}
                </Text>
                <Text h5={true} style={styles.text}>
                    Altura: {this.props.container.height}
                </Text>
                <Text h5={true} style={styles.text}>
                    Radio: {this.props.container.radius}
                </Text>
                <Text h5={true} style={styles.text}>
                    Volumen: {this.props.container.volume}
                </Text>
                <Text h5={true} style={styles.text}>
                    Contenido actual: {this.props.container.volume}
                </Text>
                <DefaultButton 
                    loading={false}
                    title={"Realizar medición"}
                    icon="ios-code-working"
                    onPress={() => {alert("TODO: Implementar hacer medición")}}
                />
                <DefaultButton 
                    loading={false}
                    title={"Ver Estadísticas"}
                    icon="ios-code-working"
                    onPress={this.pushStatsScreen}
                />
                <DefaultButton 
                    loading={false}
                    title={"Configurar dispositivo"}
                    icon="ios-cog"
                    onPress={this.showConfigureDeviceModal}
                />
            </DefaultScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around',
        padding: 20,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: colorPalette.orange,
        borderBottomColor: colorPalette.orange
    },
    buttonContainer: {
        borderTopWidth: 2,
        borderColor: "#fff",
        flex: 1,
        alignItems: 'center',
    },
    text: {
        color: colorPalette.white
    },
    textCentered: {
        textAlign: 'center'
    }
});

export default ShowScreen;

