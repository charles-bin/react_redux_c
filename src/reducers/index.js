import { combineReducers } from 'redux'

import {
  authClientLoaded,
  requestedChannel,
  requestedChannelResources,
  isFetching,
} from './youtube'

const rootReducer = combineReducers({
  authClientLoaded,
  requestedChannel,
  requestedChannelResources,
  isFetching,
})

export default rootReducer
