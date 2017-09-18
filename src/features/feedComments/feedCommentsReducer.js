import {
  INVALIDATE_REDDIT,
  REQUEST_COMMENTS, 
  RECEIVE_COMMENTS, 
} from '../../constants/ActionTypes.js'

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
}, action) => {
  switch (action.type) {
    case REQUEST_COMMENTS:    
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case RECEIVE_COMMENTS:    
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.commentsObjects,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const comments = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_COMMENTS:
    case REQUEST_COMMENTS:
      return {
        ...state,
        [action.redditId]: posts(state[action.redditId], action)
      }
    default:
      return state
  }
}

export default comments