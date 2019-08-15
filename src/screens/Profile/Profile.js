import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Navigation } from 'react-native-navigation';

// Redux
import { connect } from 'react-redux';
import { removeAuthorization } from './../../store/actions/Index';

const STORAGE_KEY = 'authorization';

class ProfileScreen extends React.Component {

    state = {
        rendering: true
    }

    /**
     * Removes the authorization data from the device
     * and send the user back to the login screen
     */
    logout = () => {
        this.setState({rendering: false});
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
                            visible: false,
                            height: 0,
                        },
                        bottomTabs: {
                            visible: false,
                            drawBehind: true, // for android
                            height: 0,
                        }
                    }
                }
            }
        ]);
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.rendering &&
                    <View>
                        <Text style={styles.text}>¡Hola {this.props.profile.name}!</Text>
                        <Text style={styles.text}>Correo: {this.props.profile.email}</Text> 
                    </View>
                }
                <Button title="Logout" onPress={this.logout}/>
            </View>
        );
    }

}

ProfileScreen.defaultProps = {
    profile: {
        name: '',
        email: ''
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 25,
    },
    text: {
        marginBottom: 25
    }
});

const mapStateToProps = state => {
    return {
        profile: state.authorization.profile,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        removeAuthorizationData: authorization => dispatch(removeAuthorization(authorization))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);