import {
  INVALIDATE_REDDIT,
  REQUEST_DETAIL, 
  RECEIVE_DETAIL
} from '../../constants/ActionTypes.js'

const posts = (state = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  after: '',
  before: '',
}, action) => {
  switch (action.type) {
    case REQUEST_DETAIL:    
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      }
    case RECEIVE_DETAIL:    
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.detailObject,
        after: action.after,
        before: action.before,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

const postsByRedditId = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_DETAIL:
    case REQUEST_DETAIL:
      return {
        ...state,
        [action.redditId]: posts(state[action.redditId], action)
      }
    default:
      return state
  }
}

export default postsByRedditId