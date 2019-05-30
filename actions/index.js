import {addCartaBaralho,getBaralho,getBaralhos,saveTituloDoBaralho} from '../utils/api'

export const RECEBER_BARALHOS = 'RECEBER_BARALHOS';
export const RECEBE_BARALHO = 'RECEBE_BARALHO';
export const ADICIONAR_BARALHO = 'ADICIONAR_BARALHO';
export const ADICIONA_CARTA_BARALHO = 'ADICIONA_CARTA_BARALHO';


export function receberBaralhos(baralhos){
    return {
        type:RECEBER_BARALHOS,
        baralhos
    }
}

export function handleReceberBaralhos(){
    return (dispatch,getState)=>{
        return getBaralhos()
                .then(baralhos=>dispatch(receberBaralhos(baralhos)))
    }
}

export function handleRecebeBaralho(id){
    return {
        type:RECEBE_BARALHO,
        id
    }
}

function adicionaBaralho (tituloBaralho){
    return {
        type:ADICIONAR_BARALHO,
        tituloBaralho,
    }
}

export function handleAdicionaBaralho(tituloBaralho){
    return (dispatch,getState) =>{
        return saveTituloDoBaralho(tituloBaralho)
        .then(()=>dispatch(adicionaBaralho(tituloBaralho)))
    }
}

export function adicionaCartaBaralho ({tituloBaralho,carta}){
    return {
        type:ADICIONA_CARTA_BARALHO,
        tituloBaralho,
        carta
    }
}

export function handleAdicionaCartaBaralho({tituloBaralho,carta}){
    return (dispatch,getState) => {
        return addCartaBaralho(tituloBaralho,carta)
        .then(()=>dispatch(adicionaCartaBaralho({tituloBaralho,carta})))
    }
}