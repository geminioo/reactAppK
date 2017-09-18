import { combineReducers } from 'redux'
import posts from './feed/feedReducer'
import postsByReddit from './feedPosts/feedPostsReducer'
import postsByRedditId from './feedDetail/feedDetailReducer'
import comments from './feedComments/feedCommentsReducer'

export default combineReducers({
  feed: posts,
  postsByReddit: postsByReddit,
  postsByRedditId: postsByRedditId,
  comments: comments
});
