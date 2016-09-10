import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './itemsReducers'

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./itemsReducers', () => {
      const nextReducer = require('./itemsReducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
