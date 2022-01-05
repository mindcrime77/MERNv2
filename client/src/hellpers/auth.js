import { setCookie, getCookie, deleteCookie } from '../hellpers/cookies'
import { setLocalStorage, getLocaStorage, deleteLocalStorage } from '../hellpers/localStorage'

export const setAuth = (token, user) => {
    setCookie('token', token)
    setLocalStorage('user', user)
}

export const isAuth = () => {
    if (getCookie('token') && getLocaStorage('user')) {
        return getLocaStorage('user')
    } else {
        return false
    }
}

export const logout = next => {
    deleteCookie('token')
    deleteLocalStorage('user')
    deleteLocalStorage('cart')
    next()
}