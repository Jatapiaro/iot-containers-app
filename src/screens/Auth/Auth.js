import React, {Component} from 'react';
import { View, StyleSheet, Text, TextInput, Button } from 'react-native';
import axios from 'axios';

export default class AuthScreen extends Component {

    loginHandler = () => {
    }

    test = () => {
        alert("Helo");
    }

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            registration: false
        };
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        console.log(this.state);
    }

    handleValueChange = (name, value) => {
        this.setState({[name]: value});
    }

    handleLogin = () => {
        this.props.authorizationService.authorize(this.state.email, this.state.password)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Iniciar Sesión</Text>
                <TextInput 
                    value={this.state.email}
                    placeholder="Email"
                    onChangeText={(value) => {this.handleValueChange('email', value)}}
                />
                <TextInput 
                    value={this.state.password}
                    placeholder="Password"
                    onChangeText={(value) => {this.handleValueChange('password', value)}}
                />
                <Button 
                    title="Ok"
                    onPress={this.handleLogin}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({


    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },

});