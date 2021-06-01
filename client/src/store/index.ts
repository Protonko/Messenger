import {createStore, applyMiddleware, compose} from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import rootReducer from './reducers'
import {rootWatcher} from './saga'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware, logger]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  rootReducer,
  {},
  compose(applyMiddleware(...middleware), composeEnhancers()),
)

sagaMiddleware.run(rootWatcher)
