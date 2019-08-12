import React from 'react';
import { Button, ListItem } from 'react-native-elements'
import { Alert, StyleSheet, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/Ionicons';

// Custom components
import DefaultScrollView from '../../components/DefaultScrollView';
import colorPalette from './../../components/ColorPalette';

// Redux
import  { connect } from 'react-redux';
import { setContainers, deleteContainer } from './../../store/actions/Index';

const Image = { 
    source: { 
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaB0W-sfGZUxbUHrBK5_UOsj904VhHfFFMsVop5O7ifmy-v2e" 
    } 
};

class IndexScreen extends React.Component {

    state = {
        openedIndex: -1,
        rowMap: null
    }

    /**
     * Constructor
     */
    constructor(props) {
        super(props);
        // Binds the events related to naigation
        Navigation.events().bindComponent(this);
    }
    
    /**
     * Called before the screen is loaded
     */
    componentWillMount() {
        this.props.containerService.all()
            .then(res => {
                this.props.setContainers(res.reverse());
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * Handler of some navigation button presses
     * @param {*} navigationEvent of the pressed button
     */
    navigationButtonPressed(navigationEvent) {
        if (navigationEvent.buttonId === "showCreateContainerScreen") {
            Navigation.push(this.props.componentId, {
                component: {
                    name: 'containers-app.ContainersCreateScreen',
                    options: {
                        topBar: {
                            title: {
                                text: "Crear Contenedor",
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
    }

    /**
     * Shows a confirmation modal in order
     * to continue with the operation
     */
    showCancelConfirmation = (container) => {
        Alert.alert(
            `¿Estás seguro que deseas eliminar el contenedor ${container.name}?`,
            'Se borrará el contenedor y todos los datos relacionados a el',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {text: 'Sí, eliminar', onPress: () => this.deleteContainerFromDatabase(container)},
            ],
            {cancelable: false},
        );
    }

    /**
     * Deletes the container from the database
     */
    deleteContainerFromDatabase = (container) => {
        // Remove container from redux state
        this.props.deleteContainer(container);
        // Close swipe row
        this.state.rowMap[container.id].closeRow();
        this.setState({rowMap: null, openedIndex: -1});
        // Remove container from db
        this.props.containerService.delete(container)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    /**
     * Goes to the show view of a container
     * @param {*} index 
     */
    showContainer = (index) => {
        let container = this.props.containers[index];
        if (this.state.rowMap !== null && this.state.openedIndex === container.id) {
            this.state.rowMap[container.id].closeRow();
            this.setState({rowMap: null, openedIndex: -1});
            return;
        }
        Navigation.push(this.props.componentId, {
            component: {
                name: 'containers-app.ContainersShowScreen',
                passProps: {
                    container: container
                },
                options: {
                    topBar: {
                        title: {
                            text: `Contenedor`,
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
     * Called when the row is being opened
     */
	onRowOpen = (rowKey, rowMap) => {
		this.setState({
            openedIndex: parseInt(rowKey),
            rowMap: rowMap
        });
    }
    
    /**
     * Called when the rows is completely closed
     */
    onRowDidClose = (rowKey, rowMap) => {
		this.setState({
            openedIndex: -1,
            rowMap: null
        });
    }

    render() {
        return (
            <DefaultScrollView style={styles.container}>
                <SwipeListView
                    onRowOpen={this.onRowOpen}
                    onRowDidClose={this.onRowClose}
                    previewOpenDelay={2000}
                    renderHiddenItem={(data, rowMap) => (
                        <View style={styles.rowBack}>
                            <Button
                                icon={
                                    <Icon
                                    name="ios-trash"
                                    size={25}
                                    color="white"
                                    />
                                }
                                type="clear"
                                onPress={() => this.showCancelConfirmation(data.item)}
                            />
                        </View>
                    )}
                    keyExtractor={(rowData, index) => {
                        return rowData.id.toString();
                    }}
                    disableRightSwipe={true}
                    rightOpenValue={-75}
                    data={this.props.containers}
                    renderItem={({item, index}) => (
                        <ListItem
                            containerStyle={{borderBottomWidth: 1, borderBottomColor: "#000"}}
                            key={item.id}
                            leftAvatar={Image}
                            onPress={() => {this.showContainer(index)}}
                            subtitle={
                                `${item.dummy === true? 'Por favor configura tu dispositivo' : 'Contenido actual: '}`
                            }
                            subtitleStyle={(item.dummy == true)? [styles.configurationText, styles.subtitule] : styles.subtitule}
                            title={item.name}
                            titleStyle={styles.title}
                        />
                    )}>
                </SwipeListView>
            </DefaultScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: colorPalette.orange,
        borderBottomColor: colorPalette.orange
    },
    title: {
        fontSize: 16,
    },
    subtitule: {
        fontSize: 10
    },
    configurationText: {
        color: colorPalette.danger
    },
    rowBack: {
		alignItems: 'center',
		backgroundColor: colorPalette.red,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-end',
        paddingRight: 20
	},
});

const mapStateToProps = state => {
    return {
        containers: state.containers.containers,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setContainers: (containers) => dispatch(setContainers(containers)),
        deleteContainer: (container) => dispatch(deleteContainer(container))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(IndexScreen);