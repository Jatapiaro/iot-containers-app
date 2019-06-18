# IoT Containers App

This is the application for the IoT proyect that pretends to store all the data from different devices that read/measure the volume quantity on a container.

# Install React Native (OSX)

1. Install brew
```shell
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
2. Install watchman
```shell
$ brew install watchman
```

3. Install react native
```shell
$ yarn global add react-native-cli
```

# Install Instructions

1. Install react native
2. Clone the repo
3. Move to the recently created folder
```shell
$ cd folder
```
4. Install yarn globally (if it is not installed)
```shell
$ npm install -g yarn
```
5. Install all dependencies
```shell
$ yarn install
```

6. Run the project
At this stage of the project there is not a server for the bakend. Be sure to install it and then change the URL of the HttpService and OauthService to your ip and port. I'll document how to install the backend using AMPPS so you don't need to use the port. 
Anyway.

Please run the following commmand before run in your device.
```shell
$ yarn start
```

# Running the App

## Runining the app on iOS
Download XCode, clic on the `ios/project.xcodeproject`,  select a Sign Team, and then clic on run.

## Running the app on Android
Until this point the following instructions only work for OSX, in Windows I don't know the running procedure.
### Running the app using an Android device and OSX as the computer OS
1. Install Android Studio, click on open existing project and open the `android` folder that is inside the React Native project.
2. The following instructions only work on OSX, I don't know how this would work on windows
3. In OSX `cd ~/Library/Android/sdk/platform-tools` and then `./adb reverse tcp:8081 tcp:8081`
4. Re run android app
5. Turn off reverse port `a./db forward --remove-all`

# Development Recomendations
1. Never Ever Ever Develop On Master
2. Always code in english
3. Always create a new branch for your tasks. **Do not develop on master** 
