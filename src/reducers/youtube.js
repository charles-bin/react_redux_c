import {
  SELECT_CHANNEL,
  REQUEST_CHANNEL,
} from '../actions/index'

export function selectedChannel(state='default', action) {
  switch (action.type) {
    case SELECT_CHANNEL:
      return action.channel;
    default:
      return state;
  }
}

export function requestChannel(state='', action) {
  console.log('requestChannel reducer call');
  switch (action.type) {
    case REQUEST_CHANNEL:
      return action.username;
    default:
      return state;
  }
}
