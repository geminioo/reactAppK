//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux';

import { project } from '../../config';
import FeedPostsList from './FeedPostsList';

// create a component
class FeedPostsContainer extends Component {

  // componentDidMount() {
  //   this.props.fetchPost()
  // }

  render() {
    return (
      <FeedPostsList></FeedPostsList>
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
//       dispatch(fetchPostsIfNeeded())
//     }
//   }
// }

//make this component available to the app
export default FeedPostsContainer
