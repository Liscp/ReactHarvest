import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, ScrollView, TouchableHighlight } from 'react-native';
import { Item, Input, Text, Form, Label, Container, Header, Left, Icon, Button, Title, Body, Right } from 'native-base';
import Dialog from "react-native-dialog";
import enviarData from '../../until/registro';
import colors from '../../src/style/index'
export default class Registro extends Component {
    constructor(props){
        super(props)
        this.state = {
            nombre: null,
            apellido: null,
            telefono: null,
            cedula: null,
            correo: null,
            contra: null,
            dialogVisible: false,
            labelTextNombre:"Nombre",
            labelTextApellido:"Apellido",
            labelTextCorreo:"Correo",
            labelTextContrasena:"Contraseña",
            labelTextTelefono:"Teléfono",
            labelTextCedula:"Cédula"
        }
        this.nombre=this.nombre.bind(this)
        this.apellido=this.apellido.bind(this)
        this.correo=this.correo.bind(this)
        this.contra=this.contra.bind(this)
        this.telefono=this.telefono.bind(this)
        this.cedula=this.cedula.bind(this)
        this.dialogActivador = this.dialogActivador.bind(this)
    }
    nombre(event) {
        this.setState({nombre: String(event)});
      }
      apellido(event) {
        this.setState({apellido: String(event)});
      }
      correo(event) {
        this.setState({correo: String(event)});
      }
      contra(event) {
        this.setState({contra: String(event)});
      }
      telefono(event) {
        this.setState({telefono: String(event)});
      }
      cedula(event) {
        this.setState({cedula: String(event)});
      }

    setLocal=async()=>{
        const data = JSON.stringify({
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            telefono: this.state.telefono,
            cedula: this.state.cedula,
            correo: this.state.correo,
            contra: this.state.contra,
            })
        await enviarData(data).then((data)=>{
            if(data === 'usuario incorrecto'){
                this.dialogActivador()
                this.alertInicioSessionTitulo(false)
            }else{
                this.props.navigation.push('Nav')
            console.log('prueba')
            // this.props.navigation.navigate('Home')
               
        }  
        })
        
        
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
            return `Bienvenido`
        }else{
            return `El usuario ya ha sido registrado`
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
        <ImageBackground style={styles.wrapper} source={require('../../img/fondo2.jpg')} behavior="padding">
        <Header transparent>
          <Left>
            <Button transparent onPress={this.onInicio.bind(this)}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Registrate</Title>
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
                  <Label style={[{ color, fontSize }, styles.label]}>{this.state.labelTextNombre}</Label>
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
                    inputType="text"  
                    customStyle={{marginBottom:30}}
                    onChangeText={(x) => {this.nombre(String(x))}}
                    value={this.state.nombre}
                  />
                </Item>
                <Item stackedLabel last>
                  <Label style={[{ color, fontSize }, styles.label]}>{this.state.labelTextApellido}</Label>
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
                    inputType="text"  
                    customStyle={{marginBottom:30}}
                    onChangeText={(contra) => {this.apellido(String(contra))}}
                    value={this.state.apellido}
                  />
                </Item>
                <Item stackedLabel last>
                  <Label style={[{ color, fontSize }, styles.label]}>{this.state.labelTextTelefono}</Label>
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
                    inputType="text"  
                    customStyle={{marginBottom:30}}
                    onChangeText={(contra) => {this.telefono(String(contra))}}
                    value={this.state.telefono}
                  />
                </Item>
                <Item stackedLabel last>
                  <Label style={[{ color, fontSize }, styles.label]}>{this.state.labelTextCedula}</Label>
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
                    inputType="text"  
                    customStyle={{marginBottom:30}}
                    onChangeText={(contra) => {this.cedula(String(contra))}}
                    value={this.state.cedula}
                  />
                </Item>
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
                    inputType="text"  
                    customStyle={{marginBottom:30}}
                    onChangeText={(contra) => {this.correo(String(contra))}}
                    value={this.state.correo}
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
                    inputType="text"  
                    customStyle={{marginBottom:30}}
                    onChangeText={(contra) => {this.contra(String(contra))}}
                  value={this.state.contra}
                  />
                </Item>
              </Form>
            </ScrollView>
            <View style={styles.buttonWrapper}>
              <TouchableHighlight onPress={() =>this.setLocal()} style={[{ opacity: 0.6 }, styles.button]}>
                <Text >Registrate</Text>
              </TouchableHighlight>
            </View>
    
                
                  <Dialog.Container visible={this.state.dialogVisible}>
                    <Dialog.Title>{this.alertInicioSessionTitulo()}</Dialog.Title>
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