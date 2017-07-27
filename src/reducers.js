import { combineReducers } from 'redux'
import {
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SELECT_CHANNEL,
  REQUEST_CHANNEL,
} from './actions'

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit
    default:
      return state
  }
}

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      /* This syntax assigns the key/value pairs in state to the empty object {}
        then adds the key action.subreddit with the value returned by the post function.
        The returned object is just the new state (given the previous state and an action).
      */
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

function selectedChannel(state='default', action) {
  switch (action.type) {
    case SELECT_CHANNEL:
      return action.channel;
    default:
      return state;
  }
}

function requestChannel(state='', action) {
  console.log('requestChannel reducer call');
  switch (action.type) {
    case REQUEST_CHANNEL:
      return action.username;
    default:
      return state;
  }
}

/* This combineReducers() just uses the reducer function names as keys with the result:
  state = {
    postsBySubreddit: Object,
    selectedSubreddit: "reactjs"
  }
*/
const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
  selectedChannel,
  requestChannel,
})

export default rootReducer
