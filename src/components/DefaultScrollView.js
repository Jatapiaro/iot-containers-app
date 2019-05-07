import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet
} from 'react-native';

// Get screen dimentions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const DefaultScrollView = props => {
    return (
        <ScrollView
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[styles.container, props.style]}>

            {props.children}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#293046',
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
});

export default DefaultScrollView;

