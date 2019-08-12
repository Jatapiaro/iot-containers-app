import React from 'react';
import {
    Dimensions,
    ScrollView,
    StyleSheet
} from 'react-native';

import colorPalette from './ColorPalette';

// Get screen dimentions
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class DefaultScrollView extends React.Component {

    state = {
        layout: {
            height: SCREEN_HEIGHT,
            width: SCREEN_WIDTH
        }
    };

    onLayout = event => {
        this.setState({
            layout: {
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width
            }
        });
    };    

    render() {
        return (
            <ScrollView
            scrollEnabled={false}
            keyboardShouldPersistTaps="handled"
            onLayout={this.onLayout}
            contentContainerStyle={[this.state.layout, styles.container, this.props.style]}>

                {this.props.children}

            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorPalette.darkBlue,
    },
});

export default DefaultScrollView;

