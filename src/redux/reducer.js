import { GET_NAME, GET_POKE, GET_TYPE, GET_DETAIL, SORT_POKEMON, SORT_POKEMONATK, ORDER_BY_ORIGIN, FILTER_BY_TYPES, CLEAN, POST_POKE, CLOSE_CARD } from "./actions-types";


const initialState = {
    pokemons: [],
    pokemonsBackUp: [],
    types: [],
    pokemonDetail: {},
    pokemonCreate:[],
};

const reducer = (state = initialState, {type, payload}) => {
    switch(type){
        case GET_POKE:
            return{
                ...state,
                pokemons: payload,
                pokemonsBackUp: payload,
            };
        
        case GET_TYPE:
            return{
                ...state,
                types: payload,
            };

        case GET_NAME:
            return {
                ...state,
                pokemons: Array.isArray(payload) ? payload : (payload ? [payload] : []),
            };

        case GET_DETAIL:
            return {
                ...state,
                pokemonDetail: payload,
            };

        case SORT_POKEMON:
            const toSort = [...state.pokemons];
            const sorted =
                payload === "ASC"
                    ? toSort.sort((a, b) => (a.name || '').localeCompare(b.name || ''))
                    : payload === "DSC"
                    ? toSort.sort((a, b) => (b.name || '').localeCompare(a.name || ''))
                    : toSort;
            return {
                ...state,
                pokemons: sorted,
            };

        case SORT_POKEMONATK:
            const toSortAtk = [...state.pokemons];
            const sortATK =
                payload === "LOW"
                    ? toSortAtk.sort((a, b) => (a.attack || 0) - (b.attack || 0))
                    : payload === "HI"
                    ? toSortAtk.sort((a, b) => (b.attack || 0) - (a.attack || 0))
                    : [...state.pokemonsBackUp];
            return {
                ...state,
                pokemons: sortATK,
            };
        
            case ORDER_BY_ORIGIN:
                let order;
                if (payload === 'DB') {
                  order = state.pokemonsBackUp.filter(pokemon => pokemon.custom);
                } else if (payload === 'API') {
                  order = state.pokemonsBackUp.filter(pokemon => !pokemon.custom);
                } else {
                  order = [...state.pokemonsBackUp];
                }
                return {
                  ...state,
                  pokemons: order,
                };

            case FILTER_BY_TYPES:
                if (payload === "") return {...state, pokemons: state.pokemonsBackUp};
                const filterType = state.pokemonsBackUp.filter(pokemon => pokemon.types.includes(payload));
                return {
                    ...state,
                    pokemons: filterType,
                };

            case CLEAN:
                const cleandPokemons = state.pokemonsBackUp;
                return{
                    ...state,
                    pokemons: cleandPokemons
                }

            case POST_POKE:
                 return {
                    ...state,
                    pokemonCreate: payload,
                };

            case CLOSE_CARD:
                const pokemonDelete = state.pokemons.filter(pokemon => pokemon.id !== payload);
                return{
                    ...state,
                    pokemons: pokemonDelete,
                };
        default:
            return {...state};
    };
};

export default reducer;