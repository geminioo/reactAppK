import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Platform, Image} from 'react-native';
import { Card, CardItem, Thumbnail, Icon, Left, Body, Right, Spinner } from 'native-base';

function CardHeader({ 
  title,
  domain,  
  author,
  thumbnail,
  platform
}) {
  if (platform && platform !== Platform.OS) {
    return <View />;
  }

  const thumbnailSize = 45
  
  let haveImage = true

  if ( thumbnail === 'default' 
    || thumbnail === 'self' 
    || thumbnail === 'image'     
    || thumbnail === 'nsfw') {
    haveImage = false
  }

  return (
    <CardItem>
    <Left>
      { haveImage
        ? <Thumbnail source={{uri: thumbnail}} />                  
        : <Thumbnail source={require('../../images/Reddit-icon.png')} />                 
      }
      <Body>
        <Text>{ title } <Text style={styles.infoText}>{`(${domain})`}</Text></Text>
        <Text style={styles.infoText}>{ author }</Text>
      </Body>
    </Left>
    </CardItem>
  );
}

CardHeader.propTypes = {
  // id: PropTypes.string.isRequired,  
  // title: PropTypes.string.isRequired,
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

export default CardHeader;
