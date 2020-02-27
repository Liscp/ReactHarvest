import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Homescreen from '../HomeScreen';
import Contactscreen from '../ContactScreen'
import Aboutscreen  from '../AboutScreen'
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import Cabecera from '../headers/header'
import Registro from '../register/registro'
import Ventas from '../ventas/ventas'
import Compras from '../compras/compras';
import Perfil from '../perfil/perfil'
enableScreens();
const Tab = createBottomTabNavigator();
export default class Nav extends React.Component {
  constructor(props){
    super(props)
    this.state={
      usuario: false,
      id: false,
    }
  }
usuario(){
    if(AsyncStorage.getItem('user')!=String){
      return null
    }else{
    this.setState({
      usuario: AsyncStorage.getItem('user'),
      id: AsyncStorage.getItem('id')
    })
    
  }
}

  usuarioStorage(){
    if(this.state.usuario!=false)
    {
      return `Bienvenido ${String(this.state.usuario)}`
    }else{
      return 'Bienvenido'
    }
  }
  deleteStorage(){
    AsyncStorage.removeItem('user')
    AsyncStorage.removeItem('id')
  }

  render(){
  return (
    
<NavigationContainer>

    <Cabecera/>
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
       <Tab.Screen
        name="Login"
        component={Contactscreen}
        options={{
          title: 'Login',
        }}
      />
      <Tab.Screen
        name="Home"
        component={Homescreen}
        options={{
          title: 'Inicio',
        }}
      />
      <Tab.Screen
        name="About"
        component={Aboutscreen}
        options={{
          title: 'Publicar',
        }}
      />
       <Tab.Screen
        name="Compras"
        component={Compras}
        options={{
          title: 'Compras',
        }}
      />
      <Tab.Screen
        name="Ventas"
        component={Ventas}
        options={{
          title: 'Ventas',
        }}
      />
      <Tab.Screen
        name="Mi Perfil"
        component={Perfil}
        options={{
          gestureEnabled: false,
        }}
      />
        
    </Tab.Navigator>
    </NavigationContainer>
  );
}
}