import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import colorPalette from './../../components/ColorPalette';

const StartMainTabs = () => {
    Promise.all([
        Icon.getImageSource('ios-cube', 30),
        Icon.getImageSource('ios-contact', 30),
        Icon.getImageSource('ios-add-circle', 30)
    ]).then((res) => {
        Navigation.setRoot({
            root: {
                bottomTabs: {
                    options: {
                        bottomTabs: {
                            animate: true,
                            backgroundColor: colorPalette.darkBlue,
                            borderColor: colorPalette.white,
                            borderHeight: 5.0,
                        }
                    },
                    children: [
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: 'containers-app.ContainersIndexScreen',
                                            options: {
                                                topBar: {
                                                    animate: false,
                                                    visible: true,
                                                    title: {
                                                        text: 'Contenedores',
                                                        color: colorPalette.white
                                                    },
                                                    background: {
                                                        color: colorPalette.darkBlue
                                                    },
                                                    rightButtons: [
                                                        {
                                                            id: 'showCreateContainerScreen',
                                                            icon: res[2],
                                                            color: colorPalette.orange
                                                        } 
                                                    ]
                                                },
                                                bottomTab: {
                                                    fontSize: 12,
                                                    text: 'Contenedores',
                                                    textColor: colorPalette.white,
                                                    selectedTextColor: colorPalette.white,
                                                    icon: res[0],
                                                    iconColor: colorPalette.white,
                                                    selectedIconColor: colorPalette.orange,
                                                }
                                            }
                                        },
                                    }
                                ]
                            }
                        },
                        {
                            stack: {
                                children: [
                                    {
                                        component: {
                                            name: 'containers-app.ProfileScreen',
                                            options: {
                                                topBar: {
                                                    animate: false,
                                                    visible: true,
                                                    title: {
                                                        text: 'Perfil',
                                                        color: colorPalette.white
                                                    },
                                                    background: {
                                                        color: colorPalette.darkBlue
                                                    },
                                                },
                                                bottomTab: {
                                                    fontSize: 12,
                                                    text: 'Perfil',
                                                    textColor: colorPalette.white,
                                                    selectedTextColor: colorPalette.white,
                                                    icon: res[1],
                                                    iconColor: colorPalette.white,
                                                    selectedIconColor: colorPalette.orange,
                                                }
                                            }
                                        },
                                    }
                                ]
                            }
                        },
                    ],
                },
            }
        });
    })
}

export default StartMainTabs;