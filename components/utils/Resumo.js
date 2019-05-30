import React from 'react';
import {View,Text} from 'react-native';


function resumo({titulo,quantidade}){
    return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Text style={{
                    fontSize:30,
                    textAlign:'center'
                }}>{titulo}</Text>
                <Text style={{
                    color:'gray'
                }}>{quantidade} card{quantidade !== 1 && 's'}</Text>
            </View>
    )
}

export default resumo;