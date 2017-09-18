import axios from 'axios';
import {
  REQUEST_DETAIL, 
  RECEIVE_DETAIL
} from '../../constants/ActionTypes.js';
import { project } from '../../config';

export const requestDetail = redditId => ({
  type: REQUEST_DETAIL,
  redditId,
})

export const receiveDetail = (redditId, json) => {   
  return ({
    type: RECEIVE_DETAIL,
    redditId,
    detailObject: json.data.children[0].data,
    receivedAt: Date.now()
  })
}

const fetchDetail = redditId => dispatch => {
  dispatch(requestDetail(redditId))
  return axios({
    method:'get',
    url:`https://www.reddit.com/by_id/${redditId}.json?raw_json=1`,
    responseType:'json'
  }).then((response) => {
    if (response.data.data.children){
      dispatch(receiveDetail(redditId, response.data))      
    }
  }).catch((error) => {
    console.log(error)      
  })
}

const shouldFetchDetail = (state, redditId) => {
  const posts = state[project.name].postsByRedditId[redditId]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchDetailByRedditId = redditId => (dispatch, getState) => {
  if (shouldFetchDetail(getState(), redditId)) {
    return dispatch(fetchDetail(redditId))
  }
}