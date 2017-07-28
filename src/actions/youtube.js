import initAuthClient from '../authentication'

export const LOAD_AUTH_CLIENT = 'LOAD_AUTH_CLIENT'
export const SELECT_CHANNEL = 'SELECT_CHANNEL'
export const REQUEST_CHANNEL = 'REQUEST_CHANNEL'

export function loadAuthClient() {
  initAuthClient();
  return {
    type: LOAD_AUTH_CLIENT,
  }
}

export function selectChannel(channel) {
  return {
    type: SELECT_CHANNEL,
    channel
  }
}

export function requestChannel(username) {
  return {
    type: REQUEST_CHANNEL,
    username
  }
}
