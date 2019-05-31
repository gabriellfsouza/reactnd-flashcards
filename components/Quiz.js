import React, {Component} from 'react';
import {View,Text,TouchableNativeFeedback,TouchableOpacity,Alert} from 'react-native';
import {NavigationActions,StackActions } from 'react-navigation';
import {connect} from 'react-redux';
import BotaoPadrao from './utils/BotaoPadrao';
import {clearLocalNotification,setLocalNotification} from '../utils/helpers';


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
        debugger;
        return {
            title:'Quiz'
        }
    }

    alerta = (mensagem)=>{
        Alert.alert(
            'Fim do quiz',
            mensagem,
            [
                {text:'Recomeçar Quiz',onPress:this.recomecarQuiz},
                {text:'Voltar ao Baralho',onPress:this.voltarAoBaralho}
            ]
        );
    }

    recomecarQuiz = ()=>{
        debugger;
        const {baralho,idxPergunta,GO_BACK_KEY,tituloBaralho,arrAcertos} = this.props;
        
        const resetAction = NavigationActions.reset({
            index:2,
            actions:[NavigationActions.navigate({routeName:'Home'}),
                    NavigationActions.navigate({routeName:'Baralho',params: {tituloBaralho}}),
                    NavigationActions.navigate({routeName:'Quiz',params: {
                        tituloBaralho,
                        idxPergunta:1,
                        arrAcertos:[],
                        GO_BACK_KEY:GO_BACK_KEY
                    }})]
        })

        this.props.navigation.dispatch(resetAction);
                                                
    }

    voltarAoBaralho = () =>{
        debugger;
        const {baralho,idxPergunta} = this.props;
        const {tituloBaralho} = baralho;
        const resetAction = NavigationActions.reset({
            index:1,
            actions:[NavigationActions.navigate({routeName:'Home'}),
                    NavigationActions.navigate({routeName:'Baralho',params: {tituloBaralho}})]
        })

        this.props.navigation.dispatch(resetAction);
        
    }


    handleProximaPergunta = (acerto)=>{
        

        const {arrAcertos,idxPergunta,baralho,GO_BACK_KEY} = this.props;
        const maximo = baralho.cartas.length;
        const {tituloBaralho} = baralho;
        const novoArrAcertos = [...arrAcertos]
        novoArrAcertos.push(acerto);
        console.log('GO_BACK_KEY',GO_BACK_KEY);
        
        if(idxPergunta<maximo){
            this.props.navigation.navigate('Quiz',{tituloBaralho,idxPergunta:idxPergunta+1,arrAcertos:[...novoArrAcertos],GO_BACK_KEY});
        }else{
            const qtdAcertos = novoArrAcertos.filter(acerto=>acerto===true);
            const erros = novoArrAcertos.filter(acerto=>acerto===false);
            this.alerta(`Resultado final, da(s) ${novoArrAcertos.length} pergunta(s) você acertou ${qtdAcertos.length} e errou ${erros.length}!`);
            
            clearLocalNotification()
            .then(setLocalNotification)
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
    debugger;
    return {
        ...props,
        baralho:baralhos[tituloBaralho],
        idxPergunta,
        arrAcertos,
        GO_BACK_KEY,
        tituloBaralho
    }
}

export default connect(mapStateToProps)(Quiz);