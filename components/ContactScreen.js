import React, { Component } from 'react'
import { View, AsyncStorage, ImageBackground, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Container, Header, Title, Button, Icon, Left, Right, Body, Text, Item, Input, Form, Label } from "native-base";
import Dialog from "react-native-dialog";
import getData from '../until/login'
import colors from '../src/style/index'
export default class Contactscreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: false,
            contra: false,
            usuario: null,
            correo: null,
            dialogVisible: false,
            labelTextCorreo:"Correo",
            labelTextContrasena:"Contraseña"
        }
        this.emailInput = this.emailInput.bind(this)
        this.contraInput = this.contraInput.bind(this)
        this.dialogActivador = this.dialogActivador.bind(this)
    }
    emailInput=async(event)=>{
         this.setState({
             email: event
         })
    }
    contraInput(event){
        this.setState({
            contra: event
        })
    }
    removeItemValue=async()=> {
        try {
            await AsyncStorage.removeItem('id');
            await AsyncStorage.removeItem('user');
            await AsyncStorage.removeItem('correo');
            return true;
        }
        catch(exception) {
            return false;
        }
      }
    setLocal=async( x,y)=>{
        await getData(x,y).then((data)=>{
            if(data === 'usuario incorrecto'){
                this.dialogActivador()
                this.alertInicioSessionTitulo(false)
            }else{
            this.setState({
                usuario: data[0]['nombre'],
                correo: data[0].correo
            })
            
            AsyncStorage.setItem('id', String(data[0].id));
            AsyncStorage.setItem('user', String(data[0]['nombre']))
            AsyncStorage.setItem('correo', String(data[0]['correo']));    
            // window.location.href='http://localhost:3000'
            this.props.navigation.navigate('Nav')
            console.log(this.state.correo)
        }  
        })

        
      };
      _retrieveData = async () => {
        try {
          const user = await AsyncStorage.getItem('user');
          const correo = await AsyncStorage.getItem('correo')
          
            console.log(user,correo)
          
        } catch (error) {
          // Error retrieving data
        }
        
      };
    dialogActivador(){
        if(this.state.dialogVisible){
            return this.setState({
                dialogVisible: false
            })
        }else{
            return this.setState({
                dialogVisible: true
            })
        }

    }
    alertInicioSessionTitulo(x){
        if(x){
            return `Bienvenido ${this.state.usuario}`
        }else{
            return `Usuario o Contraseña incorrectos`
        }
    }
    onInicio(){
        console.log('Aplaste atras')
        return this.props.navigation.push('Inicio')
      }

  render() {
    const { labelTextSize, labelColor, textColor, borderBottomColor} = this.props;
    const color = labelColor || colors.white;
    const fontSize = labelTextSize || 14;
    const inputColor = textColor || colors.white  ;
    const borderBottom = borderBottomColor || "transparent";
    let secureInput = this.secureInput;
    return (
        <Container>
            <ImageBackground style={styles.wrapper} source={require('../img/fondo2.jpg')} behavior="padding">
                <Header transparent>
                    <Left>
                        <Button transparent onPress={this.onInicio.bind(this)}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Login</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={this.onInicio.bind(this)}>
                            <Text>Cancel</Text>
                        </Button>
                    </Right>
                </Header>

                <View style={styles.scrollViewWrapper, styles.avoidView}>
                    <ScrollView style={styles.scrollView}>
                        <Form>
                            <Item stackedLabel last>
                                <Label style={[{ color, fontSize }, styles.label]}>{this.state.labelTextCorreo}</Label>
                                <Input   
                                    autoCorrect={false}
                                    style={[
                                        { color: inputColor, borderBottomColor: borderBottom },
                                        styles.inputFiled
                                    ]}
                                    secureTextEntry={secureInput}
                                    labelTextSize={14} 
                                    labelColor={colors.white} 
                                    textColor={colors.white} 
                                    borderBottomColor={colors.white} 
                                    inputType="email"  
                                    customStyle={{marginBottom:30}}
                                    onChangeText={(email) => {this.emailInput(String(email))}}
                                    value={this.state.email}
                                />
                            </Item>
                            <Item stackedLabel last>
                                <Label style={[{ color, fontSize }, styles.label]}>{this.state.labelTextContrasena}</Label>
                                <Input   
                                    autoCorrect={false}
                                    style={[
                                        { color: inputColor, borderBottomColor: borderBottom },
                                        styles.inputFiled
                                    ]}
                                    secureTextEntry={secureInput}
                                    labelTextSize={14} 
                                    labelColor={colors.white} 
                                    textColor={colors.white} 
                                    borderBottomColor={colors.white} 
                                    inputType="password"  
                                    customStyle={{marginBottom:30}}
                                    onChangeText={(contra) => {this.contraInput(String(contra))}}
                                    value={this.state.contra}
                                />
                            </Item>
                        </Form>
                    </ScrollView>
                    <View style={styles.buttonWrapper}>
                        <TouchableHighlight onPress={() =>this.setLocal(this.state.email,this.state.contra)} style={[{ opacity: 0.6 }, styles.button]}>
                            <Text >Iniciar Sesion</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() =>this.removeItemValue()} style={[{ opacity: 0.6 }, styles.button]}>
                            <Text >Cerrar Sesion</Text>
                        </TouchableHighlight>
                    </View>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title>{'Usuario o contraseña incorrectos'}</Dialog.Title>
                        <Dialog.Button label="Cancel" onPress={()=>this.dialogActivador()} />
                        <Dialog.Button label="Delete" onPress={()=>this.dialogActivador()} />
                    </Dialog.Container>
                </View>
            </ImageBackground>
        </Container>
    )
  }
}
const styles = StyleSheet.create({
    wrapper: {
      display: "flex",
      flex: 1,
    },
    scrollViewWrapper: {
      marginTop: 70,
      flex: 1
    },
    avoidView: {
      paddingLeft: 30,
      paddingRight: 30,
      paddingTop: 20,
      flex:1
    },
    loginHeader: {
      fontSize: 28,
      color: colors.white,
      fontWeight: "300",
      marginBottom: 40
    },
    backgroundImage: {
      position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          opacity: 0.3
    },
    buttonWrapper: {
      alignItems: "center",
      right: -2,
      bottom: 100,
      paddingTop: 0 
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      width: 150,
      height: 80,
      backgroundColor: colors.green02,
      borderRadius: 15,
    }
  });