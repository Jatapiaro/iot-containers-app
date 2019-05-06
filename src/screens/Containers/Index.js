import React from 'react';
import { Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default class IndexScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Esta es la vista de contenedores</Text>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        margin: 25,
    }
});