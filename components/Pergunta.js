import React, {Component} from 'react';
import {View,Text,TextInput,TouchableNativeFeedback} from 'react-native';
import {connect} from 'react-redux';
import EntradaTexto from './utils/EntradaTexto';
import BotaoPadrao from './utils/BotaoPadrao';
import {NavigationActions} from 'react-navigation';

import {handleAdicionaCartaBaralho} from '../actions';


class Pergunta extends Component{
    state ={
        pergunta:'',
        resposta:'',
    }
    
    static navigationOptions = (params)=>{
        return {
            title:'Pergunta'
        }
    }

    handleEnviar = ()=>{
        //debugger;
        
        const {dispatch,baralho,onGoBack} = this.props;
        const {pergunta,resposta} = this.state;
        const {tituloBaralho} = baralho;
        const {key} = this.props.navigation.state;
        //const navigation = this.props.navigation;
        //cartas.push({pergunta,resposta});
        //debugger;

        dispatch(handleAdicionaCartaBaralho({tituloBaralho,carta:{pergunta,resposta}}))
        .then(()=>{
        
            this.setState({
                pergunta:'',
                resposta:'',
            });
            onGoBack();
            this.props.navigation.dispatch(NavigationActions.back({key}))
        })
        
    }

    /*handleModificaEstado = (e)=>{
        //debugger;
        const campo = e.nome;
        const valor = e.nativeEvent.text;

        this.setState({[campo]:valor});
    }*/

    render(){
        const {pergunta,resposta} = this.state;

        return(
            <View style={{
                flex: 1,
                backgroundColor:'white',
                
            }}>
                <View style={{marginBottom:10,marginTop:10}}>
                    <EntradaTexto placeholder='Digite a sua pergunta.' value={pergunta} onChangeText={pergunta=>this.setState({pergunta})}/>
                </View>
                <View style={{marginBottom:10,marginTop:10}}>
                    <EntradaTexto placeholder='Digite a resposta correta.' value={resposta} onChangeText={resposta=>this.setState({resposta})}/>
                </View>
                <View style={{marginBottom:10,marginTop:10,justifyContent:'center',alignItems:'center',}}>
                    <BotaoPadrao onPress={this.handleEnviar}>Enviar</BotaoPadrao>
                </View>
            </View>
        )
        
    }
}

function mapStateToProps(baralhos,props){
    const {tituloBaralho,cartas,onGoBack} = props.navigation.state.params;

    return {
        ...props,
        baralho:baralhos[tituloBaralho],
        cartas,
        onGoBack
    }
}

export default connect(mapStateToProps)(Pergunta);