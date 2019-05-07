import React from 'react';
import  { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements'
import DefaultScrollView from '../../components/DefaultScrollView';

const Image = { source: { uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsaB0W-sfGZUxbUHrBK5_UOsj904VhHfFFMsVop5O7ifmy-v2e" } }

class IndexScreen extends React.Component {

    state = {
        containers: []
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

    render() {
        return (
            <DefaultScrollView>
                {
                    this.state.containers.map((c, i) =>
                        <ListItem
                            containerStyle={{borderBottomWidth: 1, borderBottomColor: "#000"}}
                            key={i}
                            leftAvatar={Image}
                            title={c.name}
                            subtitle={c.volume}
                            onPress={() => {console.log("sdasd")}}
                        />
                    )
                }
            </DefaultScrollView>
        );
    }

}

const styles = StyleSheet.create({
});

export default connect(null, null)(IndexScreen);