import React from 'react';
import {TextInput,View,StyleSheet} from 'react-native';


export default function EntradaTexto({style = {},...props}){
    return(
        <View style={style}>
            <TextInput 
                style={styles.input}
                multiline={false}
                editable={true}
                underlineColorAndroid={'#000'}
                {...props} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    input:{
        marginLeft:15,
        marginRight:15,
        borderWidth:1,
        padding:5,
        paddingLeft:6,
        borderRadius:5,
        height:40,
    }
});