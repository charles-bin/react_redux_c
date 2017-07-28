import {
  REQUEST_CHANNEL,
} from '../actions/index'

export function requestedChannel(state='BBCEarth', action) {
  switch (action.type) {
    case REQUEST_CHANNEL:
      return action.username;
    default:
      return state;
  }
}
