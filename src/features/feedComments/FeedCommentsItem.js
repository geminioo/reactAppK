//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right } from 'native-base';

// create a component
const FeedCommentsItem = ({body, author, score}) => {

  return (
    <CardItem>    
      <View style={styles.container}>
        <View style={styles.body}>
          <View style={styles.commentHeader}>
            <Text style={styles.infoText}>{author}</Text>
            <Text style={styles.infoText}>{`${score} points`}</Text>
            <Text style={styles.infoText}>5 hours ago</Text>
          </View>
          <Text>{body}</Text>
        </View>
      </View>
    </CardItem>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // borderLeftWidth: 1,
    // borderLeftColor: 'rgba(0, 0, 0, 0.5)',
    // backgroundColor: '#2c3e50',
  },
  body: {
    paddingLeft: 0
  },
  commentHeader: {
    flex: 1,
    flexDirection: 'row',    
    justifyContent: 'flex-start',
    paddingBottom: 10
  },
  infoText: {
    fontSize: 12,
    color: 'gray',
    paddingRight: 10
  },
});

//make this component available to the app
export default FeedCommentsItem;
