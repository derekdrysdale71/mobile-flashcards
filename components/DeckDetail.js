import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const DeckDetail = props => (
  <View>
    <Text>This is the DeckDetail view</Text>
    <TouchableOpacity
      onPress={() => props.navigation.navigate('AddCard')}
    >
      <Text>Add Card</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => props.navigation.navigate('Quiz')}
    >
      <Text>Start Quiz</Text>
    </TouchableOpacity>
  </View>
)

export default DeckDetail