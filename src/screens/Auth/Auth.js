import React, {Component} from 'react';
import {
    KeyboardAvoidingView,
    StyleSheet,
    Platform
} from 'react-native';
import { Button, Text } from 'react-native-elements';

// Custom components
import colorPalette from './../../components/ColorPalette';
import DefaultScrollView from '../../components/DefaultScrollView';
import DefaultButton from '../../components/DefaultButton';
import FormInput from './../../components/FormInput';

// Models
import User from '../../models/User';
import Authorization from '../../models/Authorization';

// Navigation helpers
import StartMainTabs from './../MainTabs/StartMainTabs';

// Redux
import { connect } from 'react-redux';
import { setAuthorization, setProfile } from './../../store/actions/Index';

// Get screen dimentions
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

                    /**
                     * To simplify things, if we have the authorization
                     * we fetch the profile data and then go to the next 
                     * screen
                     */
                    this.props.setAuthorizationData(JSON.parse(res));

                    this.props.profileService.me()
                        .then(res => {
                            this.props.setProfileData(res);
                            // Load the main screen
                            StartMainTabs();
                        })
                        .catch(err => {
                            console.log(err);
                        });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    /**
     * Handles the value change of an input
     * @param {*} name of the object property
     * @param {*} value to set to that property
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

                        this.props.profileService.me()
                            .then(res => {
                                this.props.setProfileData(res);
                                this.setState({loading: false});
                                StartMainTabs();
                            })
                            .catch(err => {
                                console.log(err);
                            });
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
            <DefaultScrollView
                style={styles.container}
            >
                {
                    !this.state.fetchingAuthorization &&
                    <KeyboardAvoidingView
                        behavior="position"
                        keyboardVerticalOffset={Platform.OS === 'ios'? -200 : 0}
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

                        <DefaultButton 
                            loading={this.state.loading}
                            title={this.state.registration? `Regístrate` : `Inicia Sesión`}
                            icon="md-key"
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
            </DefaultScrollView>
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
        color: colorPalette.orange
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
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 20,
        paddingTop: 20,
    },

    formContainer: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    text: {
        color: colorPalette.white,
    }


});

const mapDispatchToProps = dispatch => {
    return {
        setAuthorizationData: authorization => dispatch(setAuthorization(authorization)),
        setProfileData: profile => dispatch(setProfile(profile)),
    }
};
export default connect(null, mapDispatchToProps)(AuthScreen);