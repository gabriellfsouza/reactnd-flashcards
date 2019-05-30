import {
    ADICIONAR_BARALHO,
    ADICIONA_CARTA_BARALHO,
    RECEBER_BARALHOS,
//    RECEBE_BARALHO,
} from '../actions';

function baralhos (state={},action){
    
    switch (action.type) {
        case RECEBER_BARALHOS:
            {
                return {
                    ...state,
                    ...action.baralhos
                };   
            }
/*        case RECEBE_BARALHO:
            {
                return state[action.id]
            }*/
        case ADICIONAR_BARALHO:
            {
                const baralho = {
                        tituloBaralho:action.tituloBaralho,
                        cartas:[]
                }

                return {
                    ...state,
                    [action.tituloBaralho]:baralho
                };      
            }
        case ADICIONA_CARTA_BARALHO:
            {
                const {tituloBaralho,carta} = action;
                const baralho = state[tituloBaralho];
                
                baralho.cartas.push(carta);
                return {...state,[tituloBaralho]:baralho};
            }
        default:
            return state;
    }
}

export default baralhos;