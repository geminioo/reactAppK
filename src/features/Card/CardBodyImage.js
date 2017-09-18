import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Platform, Image, Dimensions} from 'react-native';
import { Card, CardItem, Thumbnail, Icon, Left, Body, Right, Spinner } from 'native-base';
import Timestamp from 'react-timestamp';

function CardBodyImage({ 
  preview,
  platform
}) {
  if (platform && platform !== Platform.OS) {
    return <View />;
  }
  
  return (
    <CardItem cardBody>
    { preview 
      ? <Image source={{uri: preview.images[0].source.url }} 
                style={{height: Dimensions.get('window').width*preview.images[0].source.height/preview.images[0].source.width, 
                resizeMode: 'contain', flex: 1, justifyContent: 'center'}}/>
      : <View></View>
    }
    </CardItem>
  );
}

CardBodyImage.propTypes = {
  //  preview: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  buttomCard:{
    justifyContent: 'flex-end',    
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgContent: {
    flex: 1, 
    justifyContent: 'center',
    resizeMode: 'contain',     
    height: Dimensions.get('window').height/Dimensions.get('window').width
  },
});

export default CardBodyImage;
