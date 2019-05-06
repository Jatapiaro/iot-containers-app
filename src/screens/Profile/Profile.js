import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Navigation } from 'react-native-navigation';

// Redux
import { connect } from 'react-redux';
import { removeAuthorization } from './../../store/actions/Index';

const STORAGE_KEY = 'authorization';

class ProfileScreen extends React.Component {

    /**
     * Removes the authorization data from the device
     * and send the user back to the login screen
     */
    logout = () => {
        this.props.asyncStorageService.remove(STORAGE_KEY)
        .then(res => {
            this.props.removeAuthorizationData();
            this.showLoginScreen();
        })
        .catch(err => {
            console.log(err);
        });
    }

    showLoginScreen = () => {
        Navigation.setStackRoot(this.props.componentId, [
            {
                component: {
                    name: 'containers-app.AuthScreen',
                    options: {
                        animations: {
                            setStackRoot: {
                                enabled: true
                            }
                        },
                        topBar: {
                            visible: false
                        },
                        bottomTabs: {
                            visible: false
                        }
                    }
                }
            }
        ]);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Esta es la vista de perfil</Text>
                <Button title="Logout" onPress={this.logout}/>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        margin: 25,
    }
});


const mapDispatchToProps = dispatch => {
    return {
        removeAuthorizationData: authorization => dispatch(removeAuthorization(authorization))
    }
};
export default connect(null, mapDispatchToProps)(ProfileScreen);