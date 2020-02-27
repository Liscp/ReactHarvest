import React, { Component } from 'react';
import { Button, View, Text, StyleSheet,  ScrollView, AsyncStorage, ImageBackground } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Container } from 'native-base';
import colors from '../../src/style/index'
import getData from '../../until/listaventas'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
export default class Ventas extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [],
      loading: true,
    }
  }
//   _retrieveData = async () => {
//     try {
//       const user = await AsyncStorage.getItem('user');
//       const id = await AsyncStorage.getItem('id')
//       const correo = await AsyncStorage.getItem('correo')
//       if (user !== null) {
//         // We have data!!
//          this.setState({
//           usuarioActual: user,
//           correo: correo,
//           // nombreUsuario: String(user),
//         })
//         console.log(user,correo)
//       }
//     } catch (error) {
//       // Error retrieving data
//     }
    
//   };
  componentDidMount=async()=> {
    getData(await AsyncStorage.getItem('id')).then((data) => {
      if(data===null||data===[]){
        return null
      }else{
      this.setState({
        data: data,
        loading: false,
      }) 
    }
    });

 }
render() {
    if(this.state.loading){
      return (
        <ImageBackground style={styles.wrapper} source={require('../../img/fondo2.jpg')} behavior="padding">
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.black}>CARGANDO</Text>
          </View>
      </ImageBackground>
      )
    }else{
      // if(this.state.data===null||this.state.data===[])
      try{
        return (
          <Container>
            <ScrollView>
              <View >
                {
                  this.state.data.map((l, i) =>{
                    return(
                      <Card>
                        <CardTitle
                          title={l.nombreproducto}
                          subtitle={`Nombre: ${l.nombrecomprador} ${l.apellidocomprador}`}
                        />
                        <CardContent text={`Correo: ${l.correocomprador}`}/>
                        <CardContent text={`Telefono:  ${l.telefonocomprador}`}/>
                        <CardContent text={`Fecha Venta: ${l.fechacompra}`}/>
                        <CardContent text={`Precii:  ${l.precio}`}/>
                        <CardAction 
                          separator={true} 
                          inColumn={false}>
                            <CardButton
                              onPress={() => {}}
                              title="Share"
                              color="#FEB557"
                            />
                            <CardButton
                              onPress={() => {}}
                              title="Explore"
                              color="#FEB557"
                            />
                        </CardAction>
                      </Card>
                    )
                  })
                }
              </View>
            </ScrollView>
          </Container>
        )
      }catch{ return <Text>No tienes compras</Text>}
    }
  }
}
const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    flex: 1,
  },
  black: {
    color: colors.white
  }
});