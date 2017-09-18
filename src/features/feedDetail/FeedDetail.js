//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FeedDetailContainer from './FeedDetailContainer'

// create a component
const FeedDetail = ({id, domain}) => {
  
  return (
    <FeedDetailContainer id={id} domain={domain} />
  )
}

//make this component available to the app
export default FeedDetail
