import { ATTACK_FILTER, FIRST_RENDER, GET_POKEMONS, GET_POKEMON_ID, GET_TYPES, SEARCH_BAR, GET_ORIGINAL_POKEMONS, ATTACK_FILTER_SECOND, NAME_FILTER, NAME_FILTER_SECOND, API_ONLY_FILTER, API_ONLY_FILTER_SECOND, DB_ONLY_FILTER, DB_ONLY_FILTER_SECOND, soloapi, apisub3, GET_FILTERED_TYPE, GET_FIRST_TYPE, ERROR, EXCLUSIVE_ATTACK_FILTER, DB_ORIGINAL } from '../actions';

const initialState = {
    dbbackup:[],
    exclusive:[],
    error:[],
    firstype:[],
    typesfilter: [],
    backup2: [],
    backup: [],
    fifth: [],
    fourth: [],
    third: [],
    second: [],
    originalPokemons: [],
    first: [],
    pokemons: [],
    pokemonsDetail: {},
    types: [],
    searchBar: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_TYPES:
            return { ...state, types: [...action.payload] }

        case GET_POKEMON_ID:
            return { ...state, pokemonsDetail: { ...action.payload } }

        case GET_POKEMONS:
            return { ...state, pokemons: [...action.payload] }

        case FIRST_RENDER:
            return { ...state, first: [...action.payload] }

        case SEARCH_BAR:
            return { ...state, searchBar: { ...action.payload } }

        case ATTACK_FILTER:
            return { ...state, pokemons: [...action.payload] }

        case GET_ORIGINAL_POKEMONS:
            return { ...state, originalPokemons: [...action.payload] }
        case ATTACK_FILTER_SECOND:
            return { ...state, second: [...action.payload] }

        case NAME_FILTER:
            return { ...state, pokemons: [...action.payload] }

        case NAME_FILTER_SECOND:
            return { ...state, third: [...action.payload] }

        case DB_ONLY_FILTER:
            return { ...state, pokemons: [...action.payload] }

        case DB_ONLY_FILTER_SECOND:
            return { ...state, fourth: [...action.payload] }

        case API_ONLY_FILTER:
            return { ...state, pokemons: [...action.payload] }

        case API_ONLY_FILTER_SECOND:
            return { ...state, fifth: [...action.payload] }

        case soloapi:
            return { ...state, backup: [...action.payload] }

        case apisub3:
            return { ...state, backup2: [...action.payload] }

        case GET_FILTERED_TYPE:
            return { ...state, typesfilter: [...action.payload] }

            case GET_FIRST_TYPE:
                return{...state, firstype:[...action.payload]}

                case ERROR:
                return{...state, error:[...action.payload]}

                case EXCLUSIVE_ATTACK_FILTER:
                    return{...state, exclusive:[...action.payload]}

                    case DB_ORIGINAL:
                        return{...state, dbbackup:[...action.payload]}
        default:
            return {
                dbbackup:[],
                exclusive:[],
                error:[],
                firstype:[],
                typesfilter: [],
                backup2: [],
                backup: [],
                fifth: [],
                fourth: [],
                third: [],
                second: [],
                originalPokemons: [],
                first: [],
                pokemons: [],
                pokemonsDetail: {},
                types: [],
                searchBar: []

            }
    }
};

export default rootReducer;