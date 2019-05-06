import React from 'react';
import { Navigation } from 'react-native-navigation';

// Screens
import AuthScreen from './src/screens/Auth/Auth';

// Services
import HttpService from './src/services/HttpService';
import OauthService from './src/services/OAuthService';
import AsyncStorageService from './src/services/AsyncStorageService';

const httpService = new HttpService();
const asyncStorageService = new AsyncStorageService();
const authorizationService = new OauthService();

// Register screens
Navigation.registerComponent("containers-app.AuthScreen", () => (props) => (
	<AuthScreen
		{...props}
		authorizationService={authorizationService}
		asyncStorageService={asyncStorageService}
	/>
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