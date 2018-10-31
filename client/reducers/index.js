import { combineReducers } from "redux"

import user from './user'
import clouds from './clouds'
import ui from './ui'
import editor from './editor'

const rootReducer = combineReducers({
  user,
  clouds,
  ui,
  editor
})

export default rootReducer
