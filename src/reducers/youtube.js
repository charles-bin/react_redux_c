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
    case LOAD_CLIENT:
      return false
    default:
      return state
  }
}

export function requestedChannel(state='', action) {
  switch (action.type) {
    case REQUEST_CHANNEL:
      return action.username
    default:
      return state
  }
}

function isEmpty(object) {
  return object === undefined || Object.keys(object).length === 0
}

export function requestedChannelResources(
  state = {
    resources: {},
    prevCollapsed: false,
    nextCollapsed: false,
  },
  action
) {
  switch (action.type) {
    case RECEIVE_CHANNEL_RESOURCES:
      return Object.assign({}, {
        resources: action.channel === undefined ? {} : action.channel,
        prevCollapsed: state.nextCollapsed,
        nextCollapsed: !isEmpty(action.channel),
      })
    default:
      return state
  }
}

export function isFetching(state=false, action) {
  switch (action.type) {
    case REQUEST_CHANNEL:
      return true
    case RECEIVE_CHANNEL_RESOURCES:
      return false
    default:
      return state
  }
}
