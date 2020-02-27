import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import colors from '../src/style/index'
import { Container, Text, Item, Input, Form, Label } from "native-base";
import { View, StyleSheet, Image, AsyncStorage, ImageBackground, ScrollView, TouchableHighlight } from 'react-native';
import Dialog from "react-native-dialog";
let url = 'http://192.168.1.32:4000/contenido';
export default class AboutScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
          imagen1: 'hola',
          idUsuario: false,
          nombreUsuario: false,
          nombreproducto: '',
          empresa: '',
          descripcion: '',
          ciudad: '',
          precio: '',
          dialogVisible: false,
          image: null,
          labelTextNombreProducto: "Título",
          labelTextEmpresa:"Empresa",
          labelTextDescripcion:"Descripción",
          labelTextCiudad:"Ciudad",
          labelTextPrecio:"Precio"
        }
    
        this.nombreproducto=this.nombreproducto.bind(this)
        this.empresa=this.empresa.bind(this)
        this.descripcion=this.descripcion.bind(this)
        this.ciudad = this.ciudad.bind(this)
        this.precio = this.precio.bind(this)
        this._retrieveData=this._retrieveData.bind(this)
        this._handleImagePicked=this._handleImagePicked.bind(this)
        
      }
      
      
      nombreproducto(event){
        this.setState({nombreproducto: String(event)})
      }
      empresa(event){
        this.setState({empresa: String(event)})
      }
      descripcion(event){
        this.setState({descripcion: String(event)})
      }
      ciudad(event){
        this.setState({ciudad: String(event)})
      }
      precio(event){
        this.setState({precio: String(event)})
      }
      // imagen=async(files)=>{
    
      //   const datos = JSON.stringify(files)
        
      //   const miar = datos.split('base64":"')
      //   console.log(miar)
      //   const last = String(miar[1])
      //   const pen = last.split('","file":{}}]')
      //   console.log(String(pen[0]))
      //   await this.setState({ imagen1: String(pen[0]) })
        
      // }
      envio=async()=>{
        const data = JSON.stringify({
          idusuario: this.state.idUsuario,
          idimagen: this.state.imagen1,
          nombreproducto: this.state.nombreproducto,
          empresa: this.state.empresa,
          descripcion: await this.state.descripcion,
          ciudad: this.state.ciudad,
          precio: this.state.precio
    
          
        })
        try{
          const response = await fetch(url,{
            method: 'POST',
            body: data,
            headers:{
              'Content-type': 'application/json'
            }
          })
          if (response.ok){
            alert(`Tu publicacion ${this.state.nombreproducto} ha sido creada con éxito`)
            this.dialogActivador()
            this.props.navigation.navigate('HomeScreen')
          }
        }catch{
         
        }
      }

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

    _retrieveData = async () => {
      try {
        const miid = await AsyncStorage.getItem('id');
        const user = await AsyncStorage.getItem('user');
        if (miid !== null) {
          // We have data!!
           this.setState({
            nombreUsuario: user,
            idUsuario: miid,
            // nombreUsuario: String(user),
          })
          console.log(this.state.idUsuario,this.state.nombreUsuario)
        }
      } catch (error) {
        // Error retrieving data
      }
      
    };

    componentDidMount(){
      this._retrieveData()
    }
mostrardatos(){
  console.log(this.state.nombreUsuario,this.state.idUsuario)
}

  
    _pickImage = async () => {
      const { status: cameraRollPerm } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      );
  
      // only if user allows permission to camera roll
      if (cameraRollPerm === 'granted') {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
          base64: true,
          allowsEditing: true,
          aspect: [1, 1],
        });
  
        this._handleImagePicked(pickerResult);
      }
    };
  
    _handleImagePicked = async pickerResult => {
      this.setState({
        imagen1: `data:image/jpeg;base64,${pickerResult.base64}`
      })
     
    };

  render() {
    const { labelText, labelTextSize, labelColor, textColor, borderBottomColor, inputType,
      customStyle } = this.props;
    const color = labelColor || colors.white;
    const fontSize = labelTextSize || 14;
    const inputColor = textColor || colors.white  ;
    const borderBottom = borderBottomColor || "transparent";
    let secureInput = this.secureInput;
    let { image } = this.state;
    return (
      <Container>
        <ImageBackground style={styles.wrapper} source={require('../img/fondo2.jpg')} behavior="padding">
          <View style={styles.scrollViewWrapper, styles.avoidView}>
            <ScrollView style={styles.scrollView}>
              <View>
                <View style={styles.buttonWrapper, { 'marginTop': -5}}>
                  <TouchableHighlight onPress={this._pickImage} style={[{ opacity: 0.6 }, styles.button1]}>
                    <Text style={styles.black}>Seleccione la Imagen</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <Image
                style={{width: 200, height: 200}}
                source={{uri: `${this.state.imagen1}`}}
              />
              <Form transparent>
                <Item stackedLabel>
                  <Label style={[{ color, fontSize }, styles.label]}>{this.state.labelTextNombreProducto}</Label>
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
                    onChangeText={(x) => {this.nombreproducto(String(x))}}
                    value={this.state.nombreproducto}
                  />
                </Item>
                <Item stackedLabel>
                  <Label style={[{ color, fontSize }, styles.label]}>{this.state.labelTextEmpresa}</Label>
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
                    onChangeText={(contra) => {this.empresa(String(contra))}}
                    value={this.state.empresa}
                  />
                </Item>
                <Item stackedLabel>
                  <Label style={[{ color, fontSize }, styles.label]}>{this.state.labelTextDescripcion}</Label>
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
                    onChangeText={(contra) => {this.descripcion(String(contra))}}
                    value={this.state.descripcion}
                  />
                </Item>
                <Item stackedLabel>
                  <Label style={[{ color, fontSize }, styles.label]}>{this.state.labelTextCiudad}</Label>
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
                    onChangeText={(contra) => {this.ciudad(String(contra))}}
                    value={this.state.ciudad}
                  />
                </Item>
                <Item stackedLabel>
                  <Label style={[{ color, fontSize }, styles.label]}>{this.state.labelTextPrecio}</Label>
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
                    onChangeText={(contra) => {this.precio(String(contra))}}
                    value={this.state.precio}
                  />
                </Item>
              </Form>
              <View style={styles.buttonWrapper}>
                <TouchableHighlight onPress={() =>this.dialogActivador()} style={[{ opacity: 0.6 }, styles.button]}>
                  <Text >Enviar Datos</Text>
                </TouchableHighlight>
              </View>

              <Dialog.Container visible={this.state.dialogVisible}>
                <Dialog.Title>{`Estas a punto de encrear ${this.state.nombreproducto}`}</Dialog.Title>
                <Dialog.Button label="Cancel" onPress={()=>this.dialogActivador()} />
                <Dialog.Button label="Delete" onPress={()=>this.envio()} />
              </Dialog.Container>
            </ScrollView>
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
    paddingTop: 0,
    marginTop: 160
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 80,
    backgroundColor: colors.green02,
    borderRadius: 15,
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 80,
    backgroundColor: colors.blue,
    borderRadius: 15,
  },
  black: {
    color: colors.white
  }
});