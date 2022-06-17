import {
    GET_RECIPE,
    GET_BY_NAME,
    GET_DIET,
    GET_TYPES,
    GET_TYPES_DIET,
    POST_RECIPE,
    CLEAN_DATA,
    CLEAR_DETAIL,
    FILTER_ASC,
    FILTER_CREAD,
    FILTER_MIN,
    DELETE,
    // GET_RECIPE_DB
} from "../action/index"

const initialState = {
    recipe: [],
    copy: [],
    typeDiets: [],
    detail: {},
    detailPost: [],
    delete: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_RECIPE:
            return {
                ...state,
                recipe: action.payload,
                copy: action.payload
            }

        // case GET_RECIPE_DB:
        //     return {
        //         ...state,
        //         recipe: action.payload,
        //         copia: action.payload
        //     }

        case DELETE:
            return {
                ...state,
                delete: action.payload
            }

        case GET_BY_NAME:
            console.log(action.payload)
            return {
                ...state,
                recipe: action.payload
            }

        case FILTER_ASC:
            let orden = action.payload === "asc"
                ? state.recipe.sort((a, b) => {
                    return a.name.localeCompare(b.name)
                })
                : state.recipe.sort((a, b) => {
                    return b.name.localeCompare(a.name)
                })

            //    console.log(orden)
            return {
                ...state,
                recipe: [...orden]
            }

        case GET_TYPES_DIET:
            const allRecipes = state.copy;
            // console.log(allRecipes)
            const all = action.payload === "All"
                ? allRecipes
                : allRecipes.filter((r) => r.diets?.includes(action.payload))
            //  console.log(all)


            return {
                ...state,
                recipe: all
            }

        case GET_TYPES:
            return {
                ...state,
                typeDiets: action.payload
            }

        case CLEAN_DATA:
            return {
                ...state,
                detail: action.payload

            }

        case FILTER_MIN:
            const scoreSorted = state.recipe ? state.recipe : state.recipe
            let orderByScore = action.payload === "min"
                ? scoreSorted.sort((a, b) => {
                    if (a.healthyScore < b.healthyScore) return -1
                    if (a.healthyScore > b.healthyScore) return 1
                    return 0
                })
                : scoreSorted.sort((a, b) => {
                    if (a.healthyScore < b.healthyScore) return 1
                    if (a.healthyScore > b.healthyScore) return -1
                    return 0
                })

            return {
                ...state,
                recipe: [...orderByScore]
            }

        case GET_DIET:
            return {
                ...state,
                detail: action.payload[0]
            };

        case POST_RECIPE: {
            return {
                ...state,
                recipe: action.payload
            }
        }

        case CLEAR_DETAIL:
            return {
                ...state
            }

        case FILTER_CREAD:
           // console.log(action.payload)
            const creatorFilter = action.payload === "createdInDb"
                ? state.copy?.filter((el) => el.createdInDb) : state.copy?.filter((el) => !el.createdInDb)
               // console.log(creatorFilter)
               // console.log(state.copy)
            return {
                ...state,
                recipe: action.payload === "ALL" ? state.copy : creatorFilter
            }

        default:
            return state
    }
}

export default reducer