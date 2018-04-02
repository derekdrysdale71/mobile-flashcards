import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'

const Deck = ({ title, questions }) => {
  return (
    <View>
      <Text>{title}</Text>
      <Text>{questions && questions.length}</Text>
    </View>
  )
}

export default Deck