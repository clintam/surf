import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import App from './containers/App'
import Bot from './containers/Bot'
import {initialize} from './actions'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import Header from './components/Header'

let store = configureStore()

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={Header} >
        <IndexRoute component={App} />
        <Route path='bots' component={Bot} />
      </Route>
    </Router>
  </Provider >,
  document.getElementById('root')
)

store.dispatch(initialize())
