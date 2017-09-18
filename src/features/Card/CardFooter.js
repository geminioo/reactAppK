import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Platform, Image} from 'react-native';
import { Card, CardItem, Thumbnail, Icon, Left, Body, Right, Spinner } from 'native-base';
import Timestamp from 'react-timestamp';

function CardFooter({ 
  score,
  num_comments,
  created_utc,
  platform
}) {
  if (platform && platform !== Platform.OS) {
    return <View />;
  }
  
  return (
    <View>
      { score 
        ?
        <CardItem>
          <Left>
            <View style={styles.buttomCard}>
              <Icon name="thumbs-up" style={{fontSize: 20, color: 'gray'}} />
              <Text style={styles.infoText}> { score } Likes</Text>
            </View>
          </Left>
          <Body>
            <View style={styles.buttomCard}>
              <Icon name="chatbubbles" style={{fontSize: 20, color: 'gray'}} />
              <Text style={styles.infoText}> { num_comments } Comments</Text>
            </View>
          </Body>
          <Right>
            <Text style={styles.infoText}>
              <Timestamp 
                style={styles.infoText} 
                time={created_utc} 
                component={Text}/> 
            </Text>
          </Right>
        </CardItem>
        : <CardItem></CardItem>
      }
    </View>
  );
}

CardFooter.propTypes = {
  // id: PropTypes.string.isRequired,  
  // title: PropTypes.string.isRequired,
  // numOfcomment: PropTypes.number.isRequired,
  // onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  buttomCard:{
    justifyContent: 'flex-end',    
    flexDirection: 'row',
    alignItems: 'center',
  },
  groupText: {
    width: 270,
    marginLeft: 10,  
    paddingVertical: 10,    
    flexDirection: 'column',
    // alignItems: 'space-around',
    justifyContent: 'flex-start',
  },
  topicText: {
    fontSize: 16,
  },
  infoText: {
    fontSize: 10,
    color: 'gray'
  },
  text: {
    fontSize: 16,
  },
});

export default CardFooter;
