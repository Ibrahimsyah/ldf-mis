import { SET_AUTH, CLEAR_AUTH } from '../../contants/ActionTypes'

export const setAuth = auth => {
    return {
        type: SET_AUTH,
        payload: auth
    }
}

export const clearAuth = () => {
    return {
        type: CLEAR_AUTH
    }
}