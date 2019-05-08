import React from 'react';
import { Navigation } from 'react-native-navigation';
import DefaultScrollView from '../../components/DefaultScrollView';

class ConfigureDeviceScreen extends React.Component {

    constructor(props) {
        super(props);
        // Bind navigation events
        Navigation.events().bindComponent(this);
    }

    /**
     * Handler of some navigation button presses
     * @param {*} navigationEvent of the pressed button
     */
    navigationButtonPressed(navigationEvent) {
        if (navigationEvent.buttonId === "cancelDeviceConfiguration") {
            Navigation.dismissModal(this.props.componentId);
        }
    }

    render() {
        return (
            <DefaultScrollView>
                
            </DefaultScrollView>
        );
    }

}

export default ConfigureDeviceScreen;