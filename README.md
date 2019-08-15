# IoT Containers App

## Documentación

En esta sección, se describen las capacidades desarrolladas del proyecto, así como errores conocidos y características que fueron eliminadas y sus motivos, y por último, características que son simuladas.
En dado caso de que sea más fácil, puede acceder al siguiente link para ver el proyecto en acción:

[Vídeo de Youtube](https://youtu.be/K1Z1SejJxhc)

### Features del Proyecto
En esta sección, se mencionan cada una de las características que conforman este proyecto. 

#### Manejo de Usuarios
La pantalla inicial del proyecto esta relacionada con el registro e inicio de sesión de los usuarios. Por lo tanto, en el backend y en la aplicación, se puede registrarse como un nuevo usuario, y/o iniciar sesión con una cuenta previamente creada.
Es importante mencionar, que no hay capacidad para editar la información de usuario, y que en la tab de usuario, simplemente se nos permite ver el nombre de este.

#### Manejo de Contenedores
El manejo de contenedores es la parte principal del proyecto.
Tenemos las siguientes características dentro de estos contenedores:

 1. Listado de Contenedores
 2. Eliminar un contenedor (en la pantalla del listado, deslizar hacia la izquierda un item para ver el botón)
 3. Crear un contenedor (en la pantalla superior del listado hay un botón para esto)
 4. Ver un Contenedor, que a su vez dentro de la página tiene enlaces para:
	 a. Ver estadísticas: Por día, semana, mes y año
	 b. Ver las últimas 60 mediciones
	 c. Editar el Contenedor
	 d. Realizar una medición
	 e. Configurar dispositivo Particle (Botón removido de la versión final, ya no se ocupará)

### Errores conocidos
Durante el desarrollo encontramos los siguientes errores que por el momento no tienen una solución. Es importante mencionar que en esta sección, se consideran errores de features que fueron eliminados el proyecto.

#### La aplicación crashea en Android si se cierra un modal
El único modal que existe en la aplicación, es el modal que permite al usuario configurar su dispositivo mediante SoftAp. En android específicamente, al cerrar el modal de manera manual, la aplicación crasheaba. Este al parecer es un bug que surgió recientemente en la librería React Native Navigation V2 de Wix para react native, y que aunque hay supuestas "soluciones" en el issue de GitHub, ninguna funcionó para nosotros.

#### Los auth tokens en el photon particle siempre son inválidos
Cuando el photon particle solicita un token de autenticación para comunicarse con el server y mandar mediciones, siempre obtiene un token "inválido". La verdad es que tratando de buscar cual es el problema, una idea que tenemos es que no cabe en memoria el Token.
Ya usamos memoria para los sensores, y otras librerías y variables. Considerando que la memoria del photon es de alrededor de 1MB y que recibimos un token de 1070 caracteres. Probablemente no este entrando totalmente en memoria, provocando que nunca este completo y nunca pueda usarse.

#### No se sabe cuando una conexión por SoftAp fue exitosa
Aunque este feature ya no lo verá el usuario, si se equivocaba al poner su clave del módem al configurar el dispositivo, SoftAp no indicaría ningún error, por lo que solo observando los leds se sabría si la configuración se hizo bien o no. En su caso, se debía reiniciar el dispositivo Particle.

### Partes eliminadas de la aplicación
#### Integración con Photon Particle
Debido a los problemas de memoria del Photon, ya no pudimos hacer que se pudiera mandar mediciones al backend utilizando el Photon, a pesar de que dicha sección en el backend esta desarrollada y documentada.
Esto implica que el usuario ya no podrá acceder a la pantalla de configurar dispositivo, la cual, estaba totalmente implementada.
Al mismo tiempo, se elimina el campo DeviceID de la creación y edición de un contenedor. Este debido a que el flujo era el siguiente:

 1. Tenemos en backend una lista de ID dispositivos válidos
 2. Un usuario asignaba a su contenedor el ID del dispositivo que fuera a configurarle. De esta forma nos aseguramos de que ese dispositivo esta en nuestra flota de Photons.
 3. Dos usuarios no podrían usar el mismo photon para sus mediciones.
 4. De esta forma sabremos si hacer una medición simulada o con el particle.

Como la funcionalidad del photon se ha eliminado, todas las mediciones ahora son simuladas.

### Características Simuladas
#### Realizar Una Medición
Al apretar el botón de realizar una medición en la pantalla de Ver Contenedor, lo que se hace es generar un número random entre 0 y la altura del contenedor. Esto se manda al backend como la medición.
La  simulación en esto, es saber el volumen que hay el contenedor. A más distancia entre el "sensor" y el agua, menor volumen (pero estos cálculos los hace el backend).

#### Mediciones del usuario jacob.et.cetera@gmail.com
Para poder probar que nuestras mediciones se están llevando a cabo correctamente (día, semana, mes y año), generamos muchas mediciones falsas o dummy para probar nuestros gráficos. Por lo tanto, para esta cuenta, si nos vamos al listado de mediciones, veremos que sus últimas mediciones son del primero de enero de 2020. Esto debido a que fueron simuladas. Sin embargo, el resto de cuentas no tendría este problema.
Otro punto a considerar es que si se realiza una medición en ambos contenedores (Contenedor Prueba A y Contedor Prueba B), la medición se hará y se desplegará, pero al entrar al listado veremos las de 2020. Repito esto solo pasa para estos contenedores con información simulada.

	  
## Development Installation and Instructions
This is the application for the IoT proyect that pretends to store all the data from different devices that read/measure the volume quantity on a container.
### Install React Native (OSX)
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
### Install Instructions

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

``
6. Run the project
Please run the following commmand before run in your device.
```shell
$ yarn start
```
### Running the App
#### Runining the app on iOS
Download XCode, clic on the `ios/project.xcodeproject`, select a Sign Team, and then clic on run.

#### Running the app on Android

Until this point the following instructions only work for OSX, in Windows I don't know the running procedure.

### Running the app using an Android device and OSX as the computer OS
1. Install Android Studio, click on open existing project and open the `android` folder that is inside the React Native project.
2. The following instructions only work on OSX, I don't know how this would work on windows
3. In OSX `cd ~/Library/Android/sdk/platform-tools` and then `./adb reverse tcp:8081 tcp:8081`
4. Re run android app
5. Turn off reverse port `./adb forward --remove-all`
#### Development Recommendations
1. Never Ever Ever Develop On Master
2. Always code in english
3. Always create a new branch for your tasks. **Do not develop on master**
#### Enabling the remote debugger
For some reason the application stucks when you enable the remote debugger. So when you enable it, a new tab in your browser will open.
1. Close the new open tab in your browser
2. Open that atb using `http://{{your_ip}}:8081/debugger-ui/`
3. Reloads until it says that one session is enabled
4. Reload your app or click on reload js on your device until the app runs normally.
