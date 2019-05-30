import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View,Text, TouchableOpacity,FlatList} from 'react-native';

import {objToArray} from '../utils/helpers';
import {handleReceberBaralhos} from '../actions'

import Resumo from './utils/Resumo';

function ItemBaralho({titulo,quantidade,...props}){

    return (
        <TouchableOpacity {...props}>
            <Resumo {...{titulo,quantidade}}/>
        </TouchableOpacity>
    );
}


class ListaDeBaralhos extends Component{
    componentDidMount(){
        this.props.dispatch(handleReceberBaralhos())
            //.then(()=>this.forceUpdate());
    }

    handleClick = ({tituloBaralho})=>{
        //debugger;
        //alert(idx);
        this.props.navigation.navigate('Baralho',{tituloBaralho});
    }

    retornaCompBaralho = obj=>{
        
        const baralho = obj.item;
        return (
        <View style={{flex:1}}>
          <ItemBaralho 
              key={baralho.tituloBaralho} 
              quantidade={baralho.cartas.length} 
              titulo={baralho.tituloBaralho}
              onPress={()=>this.handleClick(baralho)}
          />
          </View>
      )}

    render(){
        //debugger;
        const {baralhos} = this.props;
        const arrBaralhos = objToArray(baralhos);
        console.log('arrBaralhos',arrBaralhos)
        return(
            <View style={{flex:1,alignItems:'center'}}>
                {this.props.loading === true
              ? null
              : (<FlatList data={arrBaralhos} renderItem={this.retornaCompBaralho} />)
                }
            </View>
        )
    }
}

function mapStateToProps(baralhos,props){
    //const {baralhos} = state;
    /*console.log('baralhos',{
        loading : baralhos === null,
        ...props,
        baralhos
      })*/
    return {
        loading : baralhos === null,
        ...props,
        baralhos
      }
}

export default connect(mapStateToProps)(ListaDeBaralhos);