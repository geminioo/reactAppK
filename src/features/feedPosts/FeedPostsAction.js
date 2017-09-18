import axios from 'axios';
import {
  REQUEST_POSTS, 
  RECEIVE_POSTS, 
  RE_REQUEST_POSTS,
  RE_RECEIVE_POSTS
} from '../../constants/ActionTypes.js';

export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit,
})

export const receivePosts = (reddit, json) => {   
  return ({
    type: RECEIVE_POSTS,
    reddit,
    before: json.data.before,
    after: json.data.after,
    topicObject: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  })
}

const fetchPosts = (reddit, after) => dispatch => {
  dispatch(requestPosts(reddit))
  return axios({
      method:'get',
      url:`https://www.reddit.com/r/${reddit}.json?after=${after}`,
      responseType:'json'
    }).then((response) => {
      // console.log('fetchPosts => response', response)
      dispatch(receivePosts(reddit, response.data))
    }).catch((error) => {
      console.log(error)      
    })
}

const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = (reddit, after) => (dispatch, getState) => {
  // if (shouldFetchPosts(getState(), reddit)) {
  //   return dispatch(fetchPosts(reddit))
  // }
  return dispatch(fetchPosts(reddit, after))  
}

export const reRequestPosts = reddit => ({
  type: RE_REQUEST_POSTS,
  reddit,
})

export const reReceivePosts = (reddit, json) => {  
  return ({
    type: RE_RECEIVE_POSTS,
    reddit,
    before: json.data.before,
    after: json.data.after,
    topicObject: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  })
}

export const reFetchPosts = (reddit, after) => dispatch => {
  dispatch(reRequestPosts(reddit))
  return axios({
      method:'get',
      url:`https://www.reddit.com/r/${reddit}.json?after=${after}`,
      responseType:'json'
    }).then((response) => {
      dispatch(reReceivePosts(reddit, response.data))
    }).catch((error) => {
      console.log(error)      
    })
}