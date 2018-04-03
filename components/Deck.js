import React from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

const Deck = ({ title, questions }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.cardCount}>{questions && questions.length} cards</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center'
  },
  cardCount: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 20,
    color: gray,
    fontWeight: '300',
    textAlign: 'center'
  }
})

export default Deck