import { SET_AUTH, CLEAR_AUTH } from '../../contants/ActionTypes'

const localStorageAuthKey = 'auth'
const initState = JSON.parse(localStorage.getItem(localStorageAuthKey))

export default (state = initState, action) => {
    const { type, payload } = action
    switch (type) {
        case SET_AUTH:
            localStorage.setItem(localStorageAuthKey, JSON.stringify(payload))
            return { ...payload }
        case CLEAR_AUTH:
            localStorage.removeItem(localStorageAuthKey)
            return null
        default:
            return state
    }
}