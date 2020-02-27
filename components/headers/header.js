import React from 'react';
import { Header, Left, Icon, Button, Title, Body } from 'native-base';
import { StyleSheet } from 'react-native';
import colors from '../../src/style/index'
export default class Cabecera extends React.Component {
    constructor(props){
      super(props)
      this.state={
        usuario: false,
        id: false,
      }
    
    }

      // _retrieveData = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem('user');
    //       if (value !== null) {
    //         this.setState({
    //             usuario: AsyncStorage.getItem('user'),
    //             id: AsyncStorage.getItem('id')
    //           })
    //       console.log(value)
    //       }
    //     } catch (error) {
         
    //     }
       
    //   }

    // componentDidMount(){
    //     this._retrieveData()
    // }
 
      deleteStorage(){
        AsyncStorage.removeItem('user')
        AsyncStorage.removeItem('id')
      }
      onInicio(){
        console.log('Aplaste atras')
        return this.props.navigation.push('HomeScreen')
      }
      render(){
        
          return(
            <Header transparent style={styles.button}>
            <Left>
              <Button transparent onPress={this.onInicio.bind(this)} >
                <Icon name="home" />
              </Button>
            </Left>
            <Body>
              <Title>Bienvenido</Title>
            </Body>
          </Header>
          )
      }      
}
const styles = StyleSheet.create({
  button: {
    textAlign: "center",
    backgroundColor: colors.green02,
  }
});