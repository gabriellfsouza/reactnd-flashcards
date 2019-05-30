import React from 'react';
import {TouchableNativeFeedback,View,Text,StyleSheet} from 'react-native';
import { pink,white } from '../../utils/colors'

export default function BotaoPadrao({
    children,
    ripple='white',
    corBotao='#000',
    corTexto='#fff',
    ...props}){
    return(
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(ripple)} {...props}>
            <View style={[styles.view,{backgroundColor:corBotao}]}>
                <Text style={{color:corTexto}}>{children}</Text>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    view:{
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        marginBottom:5,
        marginTop:5,
        height: 45,
        borderRadius: 5,
        borderWidth:1,
        alignItems: 'center',
    }
})