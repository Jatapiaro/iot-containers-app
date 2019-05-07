import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const StartMainTabs = () => {
    Promise.all([
        Icon.getImageSource('ios-cube', 30),
        Icon.getImageSource('ios-contact', 30)
    ]).then((res) => {
        Navigation.setRoot({
            root: {
                bottomTabs: {
                    options: {
                        bottomTabs: {
                            animate: true,
                            backgroundColor: "#fc7b0d"
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
                                                        text: 'Contenedores'
                                                    }
                                                },
                                                bottomTab: {
                                                    fontSize: 12,
                                                    text: 'Contenedores',
                                                    textColor: "#fff",
                                                    selectedTextColor: "#fff",
                                                    icon: res[0],
                                                    iconColor: '#fff',
                                                    selectedIconColor: '#293046',
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
                                                        text: 'Perfil'
                                                    }
                                                },
                                                bottomTab: {
                                                    fontSize: 12,
                                                    text: 'Perfil',
                                                    textColor: "#fff",
                                                    selectedTextColor: "#fff",
                                                    icon: res[1],
                                                    iconColor: '#fff',
                                                    selectedIconColor: '#293046',
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