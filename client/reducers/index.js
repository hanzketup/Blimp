import { combineReducers } from 'redux'

import user from './user'
import clouds from './clouds'
import coins from './coins'
import ui from './ui'
import editor from './editor'

const rootReducer = combineReducers({
  user,
  clouds,
  coins,
  ui,
  editor
})

export default rootReducer
