import { combineReducers } from 'redux'

import {
  authClientLoaded,
  requestedChannel,
  requestedChannelResources,
} from './youtube'

const rootReducer = combineReducers({
  authClientLoaded,
  requestedChannel,
  requestedChannelResources,
})

export default rootReducer
