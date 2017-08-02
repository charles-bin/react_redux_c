import {
  LOAD_CLIENT,
  REQUEST_CHANNEL,
  RECEIVE_CLIENT,
  RECEIVE_CHANNEL_RESOURCES,
} from '../actions/index'

export function authClientLoaded(state=false, action) {
  switch (action.type) {
    case RECEIVE_CLIENT:
      return true
    default:
      return state
  }
}

export function requestedChannel(state='YouTube', action) {
  switch (action.type) {
    case REQUEST_CHANNEL:
      return action.username
    default:
      return state
  }
}

export function requestedChannelResources(state={}, action) {
  switch (action.type) {
    case RECEIVE_CHANNEL_RESOURCES:
      let channel = action.channel
      console.log('This channel\'s ID is ' + channel.id + '. ' +
              'Its title is \'' + channel.snippet.title + ', ' +
              'and it has ' + channel.statistics.viewCount + ' views.');
      console.log('The liked playlist ID is: ' + channel.contentDetails.relatedPlaylists.likes)
      return action.channel
    default:
      return state
  }
}
