import React from 'react';
import { ListItem } from 'react-native-elements'
import { FlatList, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

// Custom components
import DefaultScrollView from '../../components/DefaultScrollView';
import colorPalette from './../../components/ColorPalette';

// Redux
import  { connect } from 'react-redux';
import { setContainers } from './../../store/actions/Index';

const Image = { 
    source: { 
        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaB0W-sfGZUxbUHrBK5_UOsj904VhHfFFMsVop5O7ifmy-v2e" 
    } 
};

class IndexScreen extends React.Component {

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
                    data={this.props.containers}
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

const mapStateToProps = state => {
    return {
        containers: state.containers.containers,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setContainers: (containers) => dispatch(setContainers(containers))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(IndexScreen);