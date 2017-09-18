import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableHighlight, Platform, Image} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Timestamp from 'react-timestamp';
import { Icon, Right } from 'native-base';

function FeedPostsItem({ 
    id, 
    domain,
    title, 
    thumbnail, 
    author, 
    numOfComment, 
    score, 
    createdUtc,
    permalink,
    onPress, 
    platform
  }) {
  if (platform && platform !== Platform.OS) {
    return <View />;
  }

  const thumbnailSize = 45
  
  let haveImage = true

  if (!thumbnail 
    || thumbnail === 'default' 
    || thumbnail === 'self' 
    || thumbnail === 'image'     
    || thumbnail === 'nsfw') {
    haveImage = false
  }

  if(score >= 10000){
    score = Math.round( score/100  ) / 10 + 'k'
  }
  
  return (
    <TouchableHighlight
      onPress={() => Actions.modularDetailPage({id, domain, permalink})}
      testID={id}
      underlayColor={'rgba(0, 0, 0, 0.054)'}
    >
      <View style={styles.row}>
          { haveImage
            ? <Image
                style={{width: thumbnailSize, height: thumbnailSize}}
                source={{uri: thumbnail}}
              />
            : <Image
                style={{width: thumbnailSize, height: thumbnailSize}}
                source={require('../../images/Reddit-icon.png')}
              />
          }
        <View style={styles.groupText}>
          <Text style={styles.topicText}>
            {title} <Text style={styles.infoText}>{`(${domain})`}</Text>
          </Text>
          <Text style={styles.infoText}>
            {`submitted `} 
            <Timestamp style={styles.infoText} time={createdUtc} component={Text}/> 
            {` by ${author}`}
          </Text>
          <Text style={styles.infoText}>
            {`${numOfComment} comments ${score} likes`}
          </Text>
        </View>

        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </View>
    </TouchableHighlight>
  );
}

FeedPostsItem.propTypes = {
  id: PropTypes.string.isRequired,  
  title: PropTypes.string.isRequired,
  // numOfcomment: PropTypes.number.isRequired,
  // onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.054)',
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

export default FeedPostsItem;
