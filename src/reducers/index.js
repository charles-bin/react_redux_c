import { combineReducers } from 'redux'

import {
  postsBySubreddit,
  selectedSubreddit,
} from './twitter'

import {
  selectedChannel,
  requestChannel,
} from './youtube'

/* The function combineReducers() just uses function names as keys with the result:
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
