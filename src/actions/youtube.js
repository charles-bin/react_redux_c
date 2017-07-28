import initAuthClient from '../authentication'

export const LOAD_AUTH_CLIENT = 'LOAD_AUTH_CLIENT'
export const REQUEST_CHANNEL = 'REQUEST_CHANNEL'

export function loadAuthClient() {
  initAuthClient();
  return {
    type: LOAD_AUTH_CLIENT,
  }
}

export function requestChannel(username) {
  return {
    type: REQUEST_CHANNEL,
    username
  }
}
