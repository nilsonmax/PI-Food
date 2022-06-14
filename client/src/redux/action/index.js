import axios from "axios"

export const GET_RECIPE = "GET_RECIPE"
export const GET_TYPES = "GET_TYPES"
export const GET_TYPES_DIET = "GET_TYPES_DIET"
export const GET_BY_NAME = "GET_BY_NAME"
export const GET_DIET = "GET_DIET"
export const POST_RECIPE = "POST_RECIPE"
export const CLEAN_DATA = "CLEAN_DATA"
export const CLEAR_DETAIL = "CLEAR_DETAIL"
export const FILTER_ASC = "FILTER_ASC"
export const FILTER_MIN = "FILTER_MIN"
export const FILTER_CREAD = "FILTER_CREAD"
export const DELETE = "DELETE"

export const getRecipes = () => {
    return async (dispatch) => {
        try {

            let json = await axios.get(`http://localhost:3001/recipe`)
            return dispatch({
                type: GET_RECIPE,
                payload: json.data
            })

        } catch (error) {
            throw error
        }
    }
}

export const getByName = (name) => {
    return async (dispatch)=> {
        try {

            let json = await axios.get(`http://localhost:3001/recipe?name=${name}`);
            return dispatch({
                type: GET_BY_NAME,
                payload: json.data
            })

        } catch (error) {
            dispatch({
                type: GET_BY_NAME,
                payload: []
            })
        }
    }
}

export const types = () => {
    return async (dispatch) => {
        try {

            let json = await axios.get("http://localhost:3001/types")
            return dispatch({
                type: GET_TYPES,
                payload: json.data
            })

        } catch (error) {
            throw error
        }
    }
}

export const getDetail = (id) => {
    return async (dispatch) => {
        try {

            const res = await axios.get(`http://localhost:3001/recipe/${id}`)
            return dispatch({
                type: GET_DIET,
                payload: res.data
            })

        } catch (error) {
            throw error
        }
    }
}

export const postCreate = (payload) => {
    return async (dispatch) => {
        try {

            const json = await axios.post(
                "http://localhost:3001/recipe/create",
                payload
            )
            return json

        } catch (error) {
            throw error
        }
    }
}

export const Remove = (id) => {
    return (dispatch) => {
        axios.delete(`http://localhost:3001/recipe/delete/${id}`).then((remo) => {
            dispatch({
                type: DELETE,
                payload: remo.id
            })

        }).catch(error => {
            console.log(error)
        })
    }
}

export const getTypeDiet = (payload) => {
    return {
        type: GET_TYPES_DIET,
        payload
    }
}

export const getFilterAsc = (payload) => {
    return {
        type: FILTER_ASC,
        payload
    }
}

export const getFilterMax = (payload) => {
    return {
        type: FILTER_MIN,
        payload
    }
}
export const getCreates = (payload) => {
    return {
        type: FILTER_CREAD,
        payload: payload
    }
}

export const cleanData = () => {
    return (dispatch) => {
        dispatch({
            type: CLEAN_DATA,
            payload: {}
        })
    }
}
