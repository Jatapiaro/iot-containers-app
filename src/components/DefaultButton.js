import React from 'react';
import {
    StyleSheet
} from 'react-native';
import { Icon, Button } from 'react-native-elements';
import colorPalette from './ColorPalette';

const DefaultButton = props => {
    return (
        <Button 
            buttonStyle={[styles.button, props.style]}
            titleStyle={[styles.buttonText, props.buttonTextStyle]}
            loading={props.loading}
            title={props.title}
            icon={<Icon name={props.icon} type={"ionicon"} color="#7384B4" size={25} iconStyle={styles.icon}/>}
            onPress={props.onPress}
        />
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: colorPalette.orange,
        width: 250,
        borderRadius: 50,
        height: 45,
    },

    buttonText: {
        fontSize: 20,
        marginLeft: 10
    },

    icon: {
        color: colorPalette.white
    },
});

export default DefaultButton;
