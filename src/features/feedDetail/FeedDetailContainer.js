//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect } from 'react-redux';

import { project } from '../../config';
import FeedDetailItem from './FeedDetailItem';

// create a component
class FeedDetailContainer extends Component {

  // componentDidMount() {
  //   this.props.fetchPost()
  // }

  render() {
    const {id, domain, permalink} = this.props
    
    return (
      <FeedDetailItem id={id} domain={domain}></FeedDetailItem>
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
//       dispatch(fetchDetailIfNeeded())
//     }
//   }
// }

//make this component available to the app
export default FeedDetailContainer
