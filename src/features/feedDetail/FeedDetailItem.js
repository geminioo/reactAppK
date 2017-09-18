import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux'
import Timestamp from 'react-timestamp';
import { Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right, Spinner } from 'native-base';
import { 
  CardHeader, 
  CardFooter, 
  CardBodyImage, 
  CardBodyText 
} from '../Card';
import { fetchDetailByRedditId } from './FeedDetailAction.js';
import { project } from '../../config';

class FeedDetailItem extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };
  }
  
  componentDidMount(){
    const { dispatch, id } = this.props 
    dispatch(fetchDetailByRedditId(id))
  }

  classifyCardType(cardType){
    const { detailObject } = this.props
    
    if (cardType === 'i'){
      return <CardBodyImage preview = {detailObject.preview} ></CardBodyImage>
    }
    else if (cardType === 'self'){
      return <CardBodyText selftext_html = {detailObject.selftext_html} ></CardBodyText>      
    }
    else{
      return <CardItem></CardItem>
    }
  }

  render() {
    // const { id, title, thumbnail, author, numOfComment, score, imgUrl } = this.props
    const { detailObject, isFetching, domain } = this.props
    const cardType = domain.split(".")[0]

    // console.log('CardMain => render => cardType', cardType)
    // console.log('CardMain => render => props', this.props)

    let isEmpty = true

    if (detailObject){
      isEmpty = detailObject.length === 0
    }

    return (
      <Card>
        { isEmpty
          ? (isFetching ? <Spinner color='lightgray' /> : <Text>Empty.</Text>) 
          :
          <View>
            <CardHeader title = {detailObject.title}
                        domain = {detailObject.domain}
                        author = {detailObject.author}
                        thumbnail = {detailObject.thumbnail}>
            </CardHeader>

            { this.classifyCardType(cardType) }

            <CardFooter score = {detailObject.score}
                        num_comments = {detailObject.num_comments}
                        created_utc = {detailObject.created_utc}>
            </CardFooter>
          </View>
        }
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  buttomLeft:{
    flexDirection: 'row',  
    alignItems: 'center',    
  },
  mainText: {
    paddingHorizontal: 16,    
    fontSize: 17,
    color: 'gray'    
  },
  infoText: {
    fontSize: 12,
    color: 'gray'
  },
  row:{
    flexDirection: 'row',
    alignItems: 'center',    
  }
});


const mapStateToProps = (state, ownProps) => {
  const { postsByRedditId } = state[project.name]
  const { id } = ownProps

  console.log('CardMain => mapStateToProps => state', state)  
  
  const {
    isFetching,
    lastUpdated,
    items: detailObject
  } = postsByRedditId[id] ||  {
    isFetching: true,
    items: {}
  }

  return {
    detailObject,
    isFetching,
    lastUpdated
  }
}

//make this component available to the app
export default connect(mapStateToProps)(FeedDetailItem) ;