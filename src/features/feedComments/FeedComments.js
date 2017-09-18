//import liraries
import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import FeedCommentsContainer from './FeedCommentsContainer'

// create a component
const FeedComments = ({id, permalink}) => {
  return (
    <FeedCommentsContainer id={id} permalink={permalink} />
  )
}

//make this component available to the app
export default FeedComments
