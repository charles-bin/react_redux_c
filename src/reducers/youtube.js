import {
  LOAD_CLIENT,
  RECEIVE_CLIENT,
  REQUEST_CHANNEL,
} from '../actions/index'

export function isAuthClientLoaded(state=false, action) {
  switch (action.type) {
    case RECEIVE_CLIENT:
      return true;
    case LOAD_CLIENT:
    default:
      return false;
  }
}

export function requestedChannel(state='BBCEarth', action) {
  switch (action.type) {
    case REQUEST_CHANNEL:
      return action.username;
    default:
      return state;
  }
}
