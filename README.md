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
Anyway, in OSX, dowload XCode, clic on the `ios/project.xcodeproject`,  select a Sign Team, and then clic on run.
In android, I don't know, I'll check it out.