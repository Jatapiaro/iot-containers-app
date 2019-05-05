import React from 'react';
import { Navigation } from 'react-native-navigation';

import AuthScreen from './src/screens/Auth/Auth';
import HttpService from './src/services/HttpService';
import OauthService from './src/services/OAuthService';

const httpService = new HttpService();
const authorizationService = new OauthService();

// Register screens
Navigation.registerComponent("containers-app.AuthScreen", () => (props) => (
  <AuthScreen {...props} authorizationService={authorizationService}/>
), () => AuthScreen);


// Start the app
Navigation.events().registerAppLaunchedListener(() => {
	Navigation.setRoot({
		root: {
			stack: {
				children: [
					{
						component: {
							id: 'id',
							name: 'containers-app.AuthScreen',
							options: {
								topBar: {
									visible: false
								},
							}
						}
					}
				],
			}
		}
	});
});