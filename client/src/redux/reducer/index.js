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
    DELETE
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
                copia: action.payload
            }

        case DELETE:
            return {
                ...state,
                delete: action.payload
            }

        case GET_BY_NAME:
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

            const all = action.payload === "All"
                    ? allRecipes
                    : allRecipes.filter((r) => r.type?.includes(action.payload))
            //   console.log(all)

            return {
                ...state,
                recipe: all
            }

        case GET_TYPES:
            // console.log(action.payload)
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
                    if (a.score < b.score) return -1
                    if (a.score > b.score) return 1
                    return 0
                })
                : scoreSorted.sort((a, b) => {
                    if (a.score < b.score) return 1
                    if (a.score > b.score) return -1
                    return 0
                })

            // console.log(orderByScore)
            return {
                ...state,
                recipe: [...orderByScore]
            }

        case GET_DIET:
            //  console.log(action.payload)
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
            const creatorFilter = action.payload === "createdInDb"
                ? state.copy?.filter((el) => el.createdInDb) : state.copy?.filter((el) => !el.createdInDb)

            return {
                ...state,
                recipe: action.payload === "ALL" ? state.copy : creatorFilter
            }

        default:
            return state
    }
}

export default reducer