import React from 'react'
import { render } from 'react-dom'
import { ThemeProvider } from 'styled-components'
import DocumentTitle from 'react-document-title'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { LocalizeProvider } from 'react-localize-redux'

import reducer from './reducers/index'
import registerServiceWorker from './registerServiceWorker'
import theme from './style/theme'
import './style/global.css'

import Root from './containers/Root'
import Home from './scenes/Home'
import Advertise from './scenes/Advertise'
import Contact from './scenes/Contact'

import Tos from './scenes/Tos'
import Pp from './scenes/Pp'

const store = createStore(reducer, applyMiddleware(thunk))
window.store = store

const MainRouter = () =>
  <ThemeProvider theme={theme}>
    <DocumentTitle title='Blimp - See more. Do more.'>
      <Root>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Route exact path='/advertise' component={Advertise} />
            <Route exact path='/contact' component={Contact} />

            <Route exact path='/terms-of-service' component={Tos} />
            <Route exact path='/privacy-policy' component={Pp} />

          </div>
        </Router>
      </Root>
    </DocumentTitle>
  </ThemeProvider>

render(
  <LocalizeProvider store={store}>
    <Provider store={store}>
      <MainRouter />
    </Provider>
  </LocalizeProvider>,
    document.getElementById('root')
  )
registerServiceWorker()
