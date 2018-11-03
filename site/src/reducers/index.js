import { combineReducers } from 'redux'
import { localizeReducer } from 'react-localize-redux'

const rootReducer = combineReducers({
  localize: localizeReducer
})

export default rootReducer
