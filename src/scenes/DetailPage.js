//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux'
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right } from 'native-base';
// import { CardMain, CommentsList } from '../index.js';
import { FeedDetail, FeedComments } from '../features';


// create a component
class DetailPage extends Component {  
  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  render() {
    const { id, permalink, domain } = this.props.navigationState
    console.log('DetailPage => render => props', this.props)
    console.log('DetailPage => render => navigationState', this.props.navigationState)
    
    return (
      <Container>
        <Content>
          
          <FeedDetail id={id} domain={domain} /> 

          <Text style={styles.mainText}>Comments</Text>
          
          <FeedComments id={id} permalink={permalink}></FeedComments>

        </Content>
      </Container>
    )
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  mainText: {
    paddingHorizontal: 16,    
    fontSize: 17,
    color: 'gray'    
  },
});

// //make this component available to the app
export default DetailPage ;
