import React, {Component} from 'react';
import {View,Text,TouchableNativeFeedback} from 'react-native';
import {connect} from 'react-redux';

import BotaoPadrao from './utils/BotaoPadrao';
import Resumo from './utils/Resumo';

class Baralho extends Component{
    static navigationOptions = ({navigation})=>{
        console.log('params',navigation.state.params);
        const {tituloBaralho} = navigation.state.params
        return {
            title:tituloBaralho
        }
    }

    handleAdicionaCard = ()=>{
        const {baralho} = this.props;
        const {tituloBaralho,cartas} = baralho;
        this.props.navigation.navigate('Pergunta',{tituloBaralho,cartas,onGoBack: () => this.forceUpdate()})
    }

    handleIniciaQuiz = ()=>{
        const {navigate,state} = this.props.navigation; 
        const {tituloBaralho,cartas} = this.props.baralho;
        if(cartas.length>0) navigate('Quiz',{
                                                tituloBaralho,
                                                idxPergunta:1,
                                                arrAcertos:[],
                                                GO_BACK_KEY:state.key
                                            });
        else (alert('Adicione ao menos um card ao baralho.'));
    }

    render(){
        const {tituloBaralho,cartas} = this.props.baralho;

        const titulo=tituloBaralho,
              quantidade=cartas.length;
        //debugger;
        return(
            <View style={{
                flex:1,
                backgroundColor:'white',
                alignItems:'center'
            }}> 
                <Resumo {...{titulo,quantidade}} />
                <View style={{flex:1,justifyContent:'flex-start'}}>
                    <BotaoPadrao corBotao='white' corTexto='black' onPress={this.handleAdicionaCard} >Adicionar card</BotaoPadrao>
                    <BotaoPadrao onPress={this.handleIniciaQuiz} >Começar quiz</BotaoPadrao>
                </View>
            </View>
            
        )
    }
}

function mapStateToProps(baralhos,props){
    const {tituloBaralho} = props.navigation.state.params;

    const {navigate,state} = props.navigation; 
    console.log('estado da navegação',state);
    return {
        ...props,
        baralho:baralhos[tituloBaralho]
    }
}

export default connect(mapStateToProps)(Baralho);