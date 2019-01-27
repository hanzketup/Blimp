import { combineReducers } from 'redux'

import user from './user'
import clouds from './clouds'
import coins from './coins'
import ui from './ui'
import editor from './editor'
import radar from './radar'
import radarform from './radarform'
import polling from './polling'

const rootReducer = combineReducers({
  user,
  clouds,
  coins,
  ui,
  editor,
  radar,
  radarform,
  polling
})

export default rootReducer
