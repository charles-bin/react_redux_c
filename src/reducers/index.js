import { combineReducers } from 'redux'

import {
  postsBySubreddit,
  selectedSubreddit,
} from './twitter'

import {
  authClientLoaded,
  requestedChannel,
  requestedChannelResources,
} from './youtube'

/* The function combineReducers() just uses function names as keys with the result:
  state = {
    postsBySubreddit: Object,
    selectedSubreddit: "reactjs",
    requestedChannel: "BBCEarth",
  }
*/
const rootReducer = combineReducers({
  postsBySubreddit,
  selectedSubreddit,
  authClientLoaded,
  requestedChannel,
  requestedChannelResources,
})

export default rootReducer
