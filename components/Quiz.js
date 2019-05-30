import React, {Component} from 'react';
import {View,Text,TouchableNativeFeedback,TouchableOpacity} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import BotaoPadrao from './utils/BotaoPadrao';


function Verso ({onPress,children,...props}){
    return (
        <View {...props}>
            <Text style={{fontSize:30,textAlign:'center'}}>{children}</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={{color:'red',textAlign:'center'}}>Pergunta</Text>
            </TouchableOpacity>
        </View>
    )
}

function Frente ({onPress,children,...props}){
    return (
        <View {...props}>
            <View>
                <Text style={{fontSize:30,textAlign:'center'}}>{children}</Text>
            </View>
            <TouchableOpacity onPress={onPress}>
                <Text style={{color:'red',textAlign:'center'}}>Resposta</Text>
            </TouchableOpacity>
        </View>
    )
}


class Quiz extends Component{
    state = {
        frente:true
    }

    static navigationOptions = ({navigation})=>{
        return {
            title:'Quiz'
        }
    }


    handleProximaPergunta = (acerto)=>{
        

        const {arrAcertos,idxPergunta,baralho,GO_BACK_KEY} = this.props;
        const maximo = baralho.cartas.length;
        const {tituloBaralho} = baralho;
        arrAcertos.push(acerto);
        console.log('GO_BACK_KEY',GO_BACK_KEY);
        
        if(idxPergunta<maximo){
            this.props.navigation.navigate('Quiz',{tituloBaralho,idxPergunta:idxPergunta+1,arrAcertos,GO_BACK_KEY});
        }else{
            const qtdAcertos = arrAcertos.filter(acerto=>acerto===true);
            const erros = arrAcertos.filter(acerto=>acerto===false);
            alert(`Resultado final, da(s) ${arrAcertos.length} pergunta(s) você acertou ${qtdAcertos.length} e errou ${erros.length}!`);
            this.props.navigation.dispatch(NavigationActions.back({key: GO_BACK_KEY}));
            //this.props.navigation.goBack(GO_BACK_KEY);
        }
    }

    handleAlteraPosicao = ()=>{
        this.setState((oldState)=>({frente:!oldState.frente}))
    }

    render(){
        const {baralho,idxPergunta} = this.props;
        const {frente} = this.state;
        const maximo = baralho.cartas.length;
        const {pergunta,resposta} = baralho.cartas[idxPergunta-1]

        console.log('teste',this.props);
        return(
            <View style={{
                flex:1,
                backgroundColor:'white',
            }}>
                <View style={{
                    flex:1,
                    alignSelf:'flex-start',
                    margin:5
                }}>
                    <Text>{idxPergunta}/{maximo}</Text>
                </View>
                <View style={{
                    flex:1,
                    alignSelf:'center',
                    alignContent:'center'
                }}>
                {frente === true 
                    ? <Frente onPress={this.handleAlteraPosicao}>{pergunta}</Frente>
                    : <Verso onPress={this.handleAlteraPosicao}>{resposta}</Verso>
                }
                </View>
                
                <View style={{
                    flex:1,
                    alignSelf:'center',
                    alignContent:'flex-start'                    
                }}>
                    <BotaoPadrao corBotao='green' onPress={()=>this.handleProximaPergunta(true)}>Correto</BotaoPadrao>
                    <BotaoPadrao corBotao='red' onPress={()=>this.handleProximaPergunta(false)}>Errado</BotaoPadrao>
                </View>
            </View>
        )
    }
}

function mapStateToProps(baralhos,props){
    const {tituloBaralho,idxPergunta,arrAcertos,GO_BACK_KEY} = props.navigation.state.params;
    //debugger;
    return {
        ...props,
        baralho:baralhos[tituloBaralho],
        idxPergunta,
        arrAcertos,
        GO_BACK_KEY
    }
}

export default connect(mapStateToProps)(Quiz);