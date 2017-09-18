import axios from 'axios';
import {
  REQUEST_COMMENTS, 
  RECEIVE_COMMENTS
} from '../../constants/ActionTypes.js';
import { project } from '../../config';

export const requestComments = (redditId, redditLink) => ({
  type: REQUEST_COMMENTS,
  redditId,
  redditLink
})

export const receiveComments = (redditId, redditLink, json) => { 
  return ({
    type: RECEIVE_COMMENTS,
    redditId,
    redditLink,
    commentsObjects: json.data.children,
    receivedAt: Date.now()
  })
}

const fetchComments = (redditId, redditLink) => dispatch => {
  dispatch(requestComments(redditId, redditLink))
  return axios({
    method:'get',
    url:`https://www.reddit.com${redditLink}.json?raw_json=1`,
    responseType:'json'
  }).then((response) => {
    dispatch(receiveComments(redditId, redditLink, response.data[1]))      
  }).catch((error) => {
    console.log(error)      
  })
}

const shouldFetchComments = (state, redditId) => {
  const posts = state[project.name].comments[redditId]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchCommentsIfNeeded = (redditId, redditLink) => (dispatch, getState) => {
  if (shouldFetchComments(getState(), redditId)) {
    return dispatch(fetchComments(redditId, redditLink))  
  }
}

// export const reRequestComments = redditId => ({
//   type: RE_REQUEST_COMMENTS,
//   redditId,
// })

// export const reReceiveComments = (redditId, json) => {  
//   return ({
//     type: RE_RECEIVE_COMMENTS,
//     redditId,
//     before: json.data.before,
//     after: json.data.after,
//     topicObject: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   })
// }

// export const reFetchComments = (redditId, after) => dispatch => {
//   dispatch(reRequestComments(redditId))
//   return axios({
//       method:'get',
//       url:`https://www.redditId.com/r/${redditId}.json?after=${after}`,
//       responseType:'json'
//     }).then((response) => {
//       dispatch(reReceiveComments(redditId, response.data))
//     }).catch((error) => {
//       console.log(error)      
//     })
// }