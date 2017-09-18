//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux';

import { project } from '../../config';
import FeedCommentsList from './FeedCommentsList';

// create a component
class FeedCommentsContainer extends Component {

  // componentDidMount() {
  //   this.props.fetchPost()
  // }

  render() {
    const {id, permalink} = this.props

    return (
      <FeedCommentsList id={id} permalink={permalink}></FeedCommentsList>
    );
  }
}

// const mapStateToProps = (state, ownProps) => {
//   return {
//     feed: state[project.name].feed
//   }
// }

// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     fetchPost: () => {
//       dispatch(fetchCommentsIfNeeded())
//     }
//   }
// }

//make this component available to the app
export default FeedCommentsContainer
