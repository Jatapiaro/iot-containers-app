import React, {Component} from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';
import FormInput from './../../components/FormInput';
import User from '../../models/User';
import Authorization from '../../models/Authorization';
import StartMainTabs from './../MainTabs/StartMainTabs';

// Redux
import { connect } from 'react-redux';
import { setAuthorization } from './../../store/actions/Index';

// Get screen dimentions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const STORAGE_KEY = 'authorization';

class AuthScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: new User(),
            errors: {},
            registration: false,
            loading: false,
            fetchingAuthorization: false,
        };
    }

    componentWillMount() {
        this.props.asyncStorageService.fetch(STORAGE_KEY)
            .then(res => {
                if (res === null || typeof res === 'undefined') {
                    console.log("No tiene el elemento");
                } else {
                    //If we have the data, we go to the next view.
                    this.props.setAuthorizationData(JSON.parse(res));
                    // Load the main screen
                    StartMainTabs();
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * Handles the value change of an input
     */
    handleValueChange = (name, value) => {
        let user = this.state.user;
        user[name] = value;
        this.setState({user: user});
    }

    /**
     * Calls the authorize function on the backend
     * when the user clic on the login button
     */
    handleLogin = () => {
        this.props.authorizationService.authorize(this.state.user.email, this.state.user.password)
            .then(res => {
                let authorization = new Authorization(res);
                this.props.asyncStorageService.store(STORAGE_KEY, authorization)
                    .then(res => {
                        // We also add the authorization data to the reducers to avoid async storage
                        this.props.setAuthorizationData(authorization);
                        this.setState({loading: false});
                        StartMainTabs();
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                /**
                 * TODO: Remove this when the app is complete,
                 * currently this is a way to test the ausence of authorization
                 */
                this.props.asyncStorageService.remove(STORAGE_KEY)
                .then(res => {
                    this.setState({loading: false});
                })
                .catch(err => {
                    console.log(err);
                });
            });
    }

    /**
     * Handles the button action and triggers
     * the correct method
     */
    handleSignUpOrLogin = () => {
        this.setState({loading: true});
        if ( this.state.registration ) {

        } else {
            this.handleLogin();
        }
    }

    /**
     * Renders the content
     */
    render() {
        return (
            <ScrollView
                scrollEnabled={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.container}
            >
                {
                    !this.state.fetchingAuthorization &&
                    <KeyboardAvoidingView
                        behavior="position"
                        contentContainerStyle={styles.formContainer}
                    >

                        <Text h3={true} style={styles.text}>
                            {this.state.registration? `Regístrate` : `Inicia Sesión`}
                        </Text>
                        
                        {
                            this.state.registration && (
                                <FormInput
                                    icon="ios-contact"
                                    value={this.state.user.name}
                                    onChangeText={(name) => {this.handleValueChange("name", name)}}
                                    placeholder="Nombre"
                                    returnKeyType="next"
                                    errorMessage={
                                        (typeof this.state.errors.name !== undefined) ? null : "Your username can't be blank"
                                    }
                                    onSubmitEditing={() => {
                                    }}
                                />
                            )
                        }

                        <FormInput
                            icon="ios-mail"
                            value={this.state.user.email}
                            onChangeText={(email) => {this.handleValueChange("email", email)}}
                            placeholder="Email"
                            keyboardType="email-address"
                            returnKeyType="next"
                            errorMessage={
                                (typeof this.state.errors.email !== undefined) ? null : "Your username can't be blank"
                            }
                            onSubmitEditing={() => {
                            }}
                        />

                        <FormInput
                            icon="ios-lock"
                            value={this.state.user.password}
                            onChangeText={(password) => {this.handleValueChange("password", password)}}
                            placeholder="Password"
                            secureTextEntry
                            errorMessage={
                                (typeof this.state.errors.email !== undefined) ? null : "Your username can't be blank"
                            }
                            onSubmitEditing={() => {
                            }}
                        />

                        <Button
                            buttonStyle={styles.signUpButton}
                            titleStyle={styles.signUpButtonText}
                            loading={this.state.loading}
                            title={this.state.registration? `Regístrate` : `Inicia Sesión`}
                            icon={<Icon name="md-key" type={"ionicon"} color="#7384B4" size={25} iconStyle={styles.icon}/>}
                            onPress={this.handleSignUpOrLogin}
                        />

                        <Button
                            title={this.state.registration? `¿Ya tienes una cuenta? !Inicia Sesión¡` : `¿Aun no tienes cuenta? ¡Regístrate!`}
                            type="clear"
                            titleStyle={styles.toggleButton}
                            onPress={this.toggle}
                        />
                    </KeyboardAvoidingView>
                }
            </ScrollView>
        );
    }

    /**
     * Toggles between log in and sign up
     */
    toggle = () => {
        this.setState((prevState) => {
            return {
                registration: !prevState.registration
            }
        });
    }

}

const styles = StyleSheet.create({

    toggleButton: {
        color: "#fc7b0d"
    },

    icon: {
        color: "#fff"
    },

    inputContainer: {
        paddingLeft: 8,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: 'rgba(110, 120, 170, 1)',
        height: 45,
        marginVertical: 10,
    },

    inputStyle: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
        fontFamily: 'light',
        fontSize: 16,
    },

    container: {
        flex: 1,
        paddingBottom: 20,
        paddingTop: 20,
        backgroundColor: '#293046',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    formContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    signUpButton: {
        backgroundColor: "#fc7b0d",
        width: 250,
        borderRadius: 50,
        height: 45,
    },

    signUpButtonText: {
        fontSize: 20,
        marginLeft: 10
    },

    text: {
        color: "#fff",
    }


});

const mapDispatchToProps = dispatch => {
    return {
        setAuthorizationData: authorization => dispatch(setAuthorization(authorization))
    }
};
export default connect(null, mapDispatchToProps)(AuthScreen);