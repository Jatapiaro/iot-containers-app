import React from 'react';
import { Navigation } from 'react-native-navigation';

// Screens
import AuthScreen from './src/screens/Auth/Auth';
import ProfileScreen from './src/screens/Profile/Profile';
import ContainersIndexScreen from './src/screens/Containers/Index';

// Services
import HttpService from './src/services/HttpService';
import OauthService from './src/services/OAuthService';
import AsyncStorageService from './src/services/AsyncStorageService';

// Redux
import { Provider } from 'react-redux';
import ConfigureStore from './src/store/ConfigureStore';

const store = ConfigureStore();

// Singleton services
const httpService = new HttpService();
const asyncStorageService = new AsyncStorageService();
const authorizationService = new OauthService();


// Register screens
Navigation.registerComponent("containers-app.AuthScreen", () => (props) => (
	<Provider store={store}>
		<AuthScreen
			{...props}
			authorizationService={authorizationService}
			asyncStorageService={asyncStorageService}
		/>
	</Provider>
), () => AuthScreen);
Navigation.registerComponent("containers-app.ProfileScreen", () => (props) => (
	<Provider store={store}>
		<ProfileScreen
			{...props}
			asyncStorageService={asyncStorageService}
		/>
	</Provider>
), () => ProfileScreen);
Navigation.registerComponent("containers-app.ContainersIndexScreen", () => ContainersIndexScreen);


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
								}
							}
						}
					}
				],
			}
		}
	});
});