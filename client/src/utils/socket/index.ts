import type {IAuthToken} from 'models/auth'
import io from 'socket.io-client'
import {CookieHandler} from 'utils/CookieHandler'
import {parseJWT} from 'utils/parseJWT'

export const socket = io(window.location.origin.replace('3000', '3001'), {
  extraHeaders: {
    id: parseJWT<IAuthToken>(CookieHandler.getCookie('token')).data.id,
  },
})
