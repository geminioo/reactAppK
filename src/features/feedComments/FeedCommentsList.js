import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, View, Image, Text, ScrollView } from 'react-native';
import { Spinner, Container, Header, Content, Card, CardItem, Thumbnail, Icon, Left, Body, Right } from 'native-base';
import FeedCommentsItem from './FeedCommentsItem.js';
import { fetchCommentsIfNeeded } from './FeedCommentsAction.js';
import { project } from '../../config';

class FeedCommentsList extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      commentsArray: []
    }
  }

  componentDidMount(){
    const { dispatch, id, permalink } = this.props
    dispatch(fetchCommentsIfNeeded(id, permalink))    
  }
  
  _genCommentView = (items) => {
    // console.log('item: ', item)
    let html = []; 

    items.map(item => {
      if (item.kind !== 'more'){
        html = [...html, 
          <View key = {item.data.id} style={{ paddingLeft: 10, paddingBottom: 10 }}>
            <View style={styles.commentGroup}>
              <FeedCommentsItem
                body = {item.data.body}
                author = {item.data.author}
                score = {item.data.score}
              >
              </FeedCommentsItem>
              { 
                item.data.replies && item.data.replies !== '' ? 
                  this._genCommentView(item.data.replies.data.children) :
                  <View></View>
              }
            </View>
          </View>
        ]
      }
    })

    // for (let i = 0 ; i<items.length ; i++){
    //   if (items[i].kind !== 'more'){
    //     html = [...html, 
    //       <View key = {items[i].data.id} style={{ paddingLeft: 10, paddingBottom: 10 }}>
    //         <View style={styles.commentGroup}>
    //           <FeedCommentsItem
    //             body = {items[i].data.body}
    //             author = {items[i].data.author}
    //             score = {items[i].data.score}
    //           >
    //           </FeedCommentsItem>
    //           { 
    //             items[i].data.replies && items[i].data.replies !== '' ? 
    //               this._genCommentView(items[i].data.replies.data.children) :
    //               <View></View>
    //           }
    //         </View>
    //       </View>
    //     ]
    //   }
    // }
    return (
      html
    )
  }

  render() {      
    const { commentsObjects, isFetching } = this.props

    // console.log('CommentList => render => props', this.props)

    let isEmpty = true
    let commentView = []
        
    if (commentsObjects){
        isEmpty = commentsObjects.length === 0    
        commentView = this._genCommentView(commentsObjects)
    }

    return (
      <Card>
        { isEmpty
          ? (isFetching ? <Spinner color='lightgray' />: <Text>Empty.</Text>) 
          : 
          <View>{ commentView }</View>         
        }

      </Card>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.054)',
  },
  buttomCard:{
    justifyContent: 'flex-end',    
    flexDirection: 'row',
    alignItems: 'center',
  },
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
  commentGroup: {
    paddingBottom: 10,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(0, 0, 0, 0.1)',
  }
});

const mapStateToProps = (state, ownProps) => {
  const { comments, selectRedditId } = state[project.name]
  const { id, permalink } = ownProps
  
  console.log('FeedCommentsList => mapStateToProps => state', state)

  const {
    isFetching,
    lastUpdated,
    items: commentsObjects
  } = comments[id] ||  {
    isFetching: true,
    items: []
  }

  return {
    commentsObjects,
    isFetching,
    lastUpdated
  }
}

//make this component available to the app
export default connect(mapStateToProps)(FeedCommentsList);