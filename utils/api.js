import {AsyncStorage} from 'react-native';

const FLASHCARDS_KEY = 'FlashCards:baralhos2'


function formataDados(strDados){
    //debugger;
    return strDados?JSON.parse(strDados):{};
}

function getAsyncObjBaralhos(){
    return AsyncStorage.getItem(FLASHCARDS_KEY)
            .then(strBaralhos=>JSON.parse(strBaralhos))
}

export function getBaralhos(){
    return AsyncStorage.getItem(FLASHCARDS_KEY)
            .then(formataDados)
}

export function getBaralho(id){
    return AsyncStorage.getItem(FLASHCARDS_KEY)
            .then(formataDados)
            .then((baralhos)=>(baralhos[id]))
}

export function saveTituloDoBaralho(tituloBaralho){
    //return AsyncStorage.mergeItem(FLASHCARDS_KEY,JSON.stringify({tituloBaralho,cartas:[]}));
    return getAsyncObjBaralhos()
            .then(baralhos=>{
                //debugger;
                return {...baralhos,[tituloBaralho]:{tituloBaralho,cartas:[]}};
            })
            .then(baralhos=>AsyncStorage.setItem(FLASHCARDS_KEY,JSON.stringify(baralhos)));
}

export function addCartaBaralho(tituloBaralho,carta){
    console.log(addCartaBaralho,{tituloBaralho,carta})
    return getAsyncObjBaralhos()
            .then(baralhos=>{
                const baralho = baralhos[tituloBaralho];
                baralho.cartas.push(carta);
                return {...baralhos,[tituloBaralho]:baralho}
            })
            .then((baralhos)=>
                AsyncStorage.setItem(FLASHCARDS_KEY,JSON.stringify(baralhos))
            )
}
