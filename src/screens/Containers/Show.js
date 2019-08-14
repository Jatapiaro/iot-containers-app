import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';

// Custom component
import DefaultScrollView from '../../components/DefaultScrollView';
import colorPalette from './../../components/ColorPalette';
import DefaultButton from '../../components/DefaultButton';
import Container from '../../models/Container';

// RNNV icons
import Icon from 'react-native-vector-icons/Ionicons';

// Navigation
import { Navigation } from 'react-native-navigation';

class ShowScreen extends React.Component {

    state = {
        container: new Container()
    }


    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.setState({
            container: this.props.container
        });
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
     * Push the edit screen
     */
    pushUpdateScreen = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'containers-app.ContainersUpdateScreen',
                passProps: {
                    container: this.state.container,
                    onPassProp: (data) => this.setState({container: data}) 
                },
                options: {
                    topBar: {
                        title: {
                            text: `Actualizar Contenedor`,
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
     * Push the meassures screen
     */
    pushMeasuresScreen = () => {
        Navigation.push(this.props.componentId, {
            component: {
                name: 'containers-app.ContainersMeasuresScreen',
                passProps: {
                    container: this.props.container,
                    onPassProp: (data) => this.setState({container: data}) 
                },
                options: {
                    topBar: {
                        title: {
                            text: `Mediciones`,
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
                    {this.state.container.name}
                </Text>
                <Text h5={true} style={styles.text}>
                    Altura: {this.state.container.height}
                </Text>
                <Text h5={true} style={styles.text}>
                    Radio: {this.state.container.radius}
                </Text>
                <Text h5={true} style={styles.text}>
                    Volumen: {this.state.container.volume}
                </Text>
                <Text h5={true} style={styles.text}>
                    Contenido Actual: {this.state.container.measures.length == 0? `Aun no tenemos una medicion` : `${this.state.container.measures[0].volume.toFixed(2)} litros`}
                </Text>
                <DefaultButton 
                    loading={false}
                    title={"Realizar Medición"}
                    icon="ios-code-working"
                    onPress={() => {alert("TODO: Implementar hacer medición")}}
                />
                <DefaultButton
                    loading={false}
                    title={"Ver Estadísticas"}
                    icon="ios-stats"
                    onPress={this.pushStatsScreen}
                />
                <DefaultButton 
                    loading={false}
                    title={"Lista de Mediciones"}
                    icon="ios-list"
                    onPress={this.pushMeasuresScreen}
                />
                <DefaultButton
                    loading={false}
                    title={"Editar Contenedor"}
                    icon="ios-create"
                    onPress={this.pushUpdateScreen}
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

