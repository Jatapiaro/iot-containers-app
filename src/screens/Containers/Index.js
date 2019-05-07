import React from 'react';
import  { connect } from 'react-redux';
import { FlatList, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements'
import DefaultScrollView from '../../components/DefaultScrollView';
import { Navigation } from 'react-native-navigation';
import colorPalette from './../../components/ColorPalette';

const Image = { 
    source: { 
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaB0W-sfGZUxbUHrBK5_UOsj904VhHfFFMsVop5O7ifmy-v2e" 
    } 
}

class IndexScreen extends React.Component {

    state = {
        containers: []
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
                this.setState({containers: res});
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * Handler of some navigation button presses
     * @param {*} buttonId of the pressed button
     */
    navigationButtonPressed(navigationEvent) {
        if (navigationEvent.buttonId === "showCreateContainerScreen") {
            console.log("Cambia de screen");
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

    render() {
        return (
            <DefaultScrollView style={styles.container}>
                <FlatList
                    data={this.state.containers}
                    renderItem={(data) => (
                        <ListItem
                            containerStyle={{borderBottomWidth: 1, borderBottomColor: "#000"}}
                            leftAvatar={Image}
                            title={data.item.name}
                            subtitle={data.item.volume}
                            onPress={() => {console.log("ok")}}
                        />
                    )}/>
            </DefaultScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 2,
        borderBottomWidth: 1,
        borderTopColor: colorPalette.orange,
        borderBottomColor: colorPalette.orange
    }
});

export default connect(null, null)(IndexScreen);