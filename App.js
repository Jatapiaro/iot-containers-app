import React from 'react';
import { Navigation } from 'react-native-navigation';

// Screens
import AuthScreen from './src/screens/Auth/Auth';
import ProfileScreen from './src/screens/Profile/Profile';
import ContainersIndexScreen from './src/screens/Containers/Index';
import ContainersCreateScreen from './src/screens/Containers/Create';
import ContainersShowScreen from './src/screens/Containers/Show';
import ContainersConfigureDeviceScreen from './src/screens/Containers/ConfigureDevice';
import ContainersStatsScreen from './src/screens/Containers/Stats';
import ContainersUpdateScreen from './src/screens/Containers/Update';
import ContainersMeasuresScreen from './src/screens/Containers/Measures';

// Services
import HttpService from './src/services/HttpService';
import ProfileService from './src/services/ProfileService';
import ContainerService from './src/services/ContainerService';
import OauthService from './src/services/OAuthService';
import AsyncStorageService from './src/services/AsyncStorageService';
import SoftapService from './src/services/SoftapService';
import StatService from './src/services/StatService';
import MeasureService from './src/services/MeasureService';


// Redux
import { Provider } from 'react-redux';
import ConfigureStore from './src/store/ConfigureStore';
import PhotonParticleService from './src/services/PhotonParticleService';

const store = ConfigureStore();

// Singleton services
const httpService = new HttpService();
const profileService = new ProfileService(httpService);
const containerService = new ContainerService(httpService);
const statService = new StatService(httpService);
const asyncStorageService = new AsyncStorageService();
const authorizationService = new OauthService();
const softapService = new SoftapService();
const photonParticleService = new PhotonParticleService();
const measureService = new MeasureService(httpService);

/**
 * Suscribe to the store to avoid passing the token to all requests
 */
store.subscribe(() => {

	if (store.getState().authorization.authorized === false) {
		httpService.setToken(null);
	}

	// Auth token
	let token = (store.getState().authorization.authorization !== null)? store.getState().authorization.authorization.full_token : null;
	let hasToken = httpService.hasToken();
	if (!hasToken && (typeof token !== 'undefined' || token !== null)) {
		httpService.setToken(token);
	}

	/**
	 * Sets the email for the photon particle calls
	 */
	let email = (store.getState().authorization.profile !== null)? store.getState().authorization.profile.email : null;
	let hasEmail = photonParticleService.hasCostumerEmail();
	if (!hasEmail && (typeof email !== 'undefined' || email !== null)) {
		photonParticleService.setCostumerEmail(email);
	}
	
});


// Register screens
Navigation.registerComponent("containers-app.AuthScreen", () => (props) => (
	<Provider store={store}>
		<AuthScreen
			{...props}
			authorizationService={authorizationService}
			profileService={profileService}
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
/**
 * Containers
 */
Navigation.registerComponent("containers-app.ContainersIndexScreen", () => (props) => (
	<Provider store={store}>
		<ContainersIndexScreen
			{...props}
			containerService={containerService}
		/>
	</Provider>
), () => ContainersIndexScreen);
Navigation.registerComponent("containers-app.ContainersCreateScreen", () => (props) => (
	<Provider store={store}>
		<ContainersCreateScreen
			{...props}
			containerService={containerService}
		/>
	</Provider>
), () => ContainersCreateScreen);
Navigation.registerComponent("containers-app.ContainersShowScreen", () => (props) => (
	<Provider store={store}>
		<ContainersShowScreen
			{...props}
			photonParticleService={photonParticleService}
		/>
	</Provider>
), () => ContainersShowScreen);
Navigation.registerComponent("containers-app.ContainersConfigureDeviceScreen", () => (props) => (
	<Provider store={store}>
		<ContainersConfigureDeviceScreen
			{...props}
			softapService={softapService}
		/>
	</Provider>
), () => ContainersConfigureDeviceScreen);
Navigation.registerComponent("containers-app.ContainersStatsScreen", () => (props) => (
	<Provider store={store}>
		<ContainersStatsScreen
			{...props}
			statService={statService}
		/>
	</Provider>
), () => ContainersConfigureDeviceScreen);
Navigation.registerComponent("containers-app.ContainersUpdateScreen", () => (props) => (
	<Provider store={store}>
		<ContainersUpdateScreen
			{...props}
			containerService={containerService}
		/>
	</Provider>
), () => ContainersUpdateScreen);
// Registra Pantalla de medidas
Navigation.registerComponent("containers-app.ContainersMeasuresScreen", () => (props) => (
	<Provider store={store}>
		<ContainersMeasuresScreen
			{...props}
			measureService={measureService}
		/>
	</Provider>
), () => ContainersConfigureDeviceScreen);

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
									visible: false,
									height: 0
								}
							}
						}
					}
				],
			}
		}
	});
});