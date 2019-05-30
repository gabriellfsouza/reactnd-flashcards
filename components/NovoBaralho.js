import React, {Component} from 'react';
import {View,Text,TextInput,TouchableNativeFeedback} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';

import BotaoPadrao from './utils/BotaoPadrao';
import EntradaTexto from './utils/EntradaTexto';

import {handleAdicionaBaralho} from '../actions'
import { white, pink } from '../utils/colors';

class NovoBaralho extends Component{
    state={
        nome:''
    }

    handleEnviaNovoBaralho = () =>{
        const {nome} = this.state;
        const {dispatch} = this.props;
        
        dispatch(handleAdicionaBaralho(nome))
        .then(()=>{

            this.props.navigation.dispatch(NavigationActions.back({
                key:'NovoBaralho'
            }))
            
            this.setState({nome:''});
        })
    }

    render(){
        const {nome} = this.state;
        

        return(
            <View style={{
                    flex:1,
                    alignItems:'stretch',
                    backgroundColor: white
                }}>
                <View style={{
                    flex:1,
                    padding: 20,
                    marginLeft: 11,
                    marginRight: 11,
                    marginTop: 15,
                    justifyContent: 'center'
                }}>
                    <Text style={{fontSize:30,textAlign:'center',}}>Qual o nome do seu novo baralho?</Text>
                </View>
                <EntradaTexto 
                    style={{
                        flex:0.5,
                    }}
                    value={nome}
                    placeholder={'Nome do Baralho'}
                    onChangeText={nome=>this.setState({nome})}
                />
                <View style={{flex:1,alignItems:'center'}}>
                    <BotaoPadrao onPress={this.handleEnviaNovoBaralho} >Enviar</BotaoPadrao>
                </View>
            </View>
        )
    }
}

export default connect()(NovoBaralho);