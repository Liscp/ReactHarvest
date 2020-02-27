import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Inicio from '../components/Inicio/Inicio';
import ContactScreen from '../components/ContactScreen';
import Registro from '../components/register/registro';
import AboutScreen from '../components/AboutScreen';
import HomeScreen from '../components/HomeScreen';
import Nav from '../components/nav/nav'


const screens = {
    Inicio: {
      screen: Inicio,
      navigationOptions:{
        headerShown: false
      }
    },
    ContactScreen: {
        screen: ContactScreen,
        navigationOptions: {
            headerShown: false 
        },
    },
    Registro: {
        screen: Registro,
        navigationOptions: {
            headerShown: false  
        },
    },
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            headerShown: false  
        },
    },
    Nav: {
        screen: Nav,
        navigationOptions: {
            headerShown: false  
        },
    },
    AboutScreen: {
        screen: AboutScreen,
        navigationOptions: {
            headerShown: false  
        },
    },
    
}

const LoginStack = createStackNavigator(screens);

export default createAppContainer(LoginStack);
