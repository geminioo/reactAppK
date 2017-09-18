import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers'
import Sherlockholmes from 'sherlockholmes'

const { inspector } = new Sherlockholmes()

export default (initialState) => {
  const middlewares = [thunk, inspector]

  const enhancer = compose(
    applyMiddleware(...middlewares)
  )

  const store = createStore(reducers, initialState, enhancer)
  
  return store
}