//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { connect } from 'react-redux'
import axios from 'axios';
import { assign } from 'lodash';
import { TopicRow, CallData } from '../index.js';
import { Spinner } from 'native-base';
import { FeedPosts } from '../features';

// create a component
class FirstPage extends Component {
  constructor(props){
    super(props)
  }

  render() {
    
    return (
      <View>
        <FeedPosts></FeedPosts>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default FirstPage
