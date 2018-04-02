import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { gray, purple } from '../utils/colors'

class DeckDetail extends Component {
  state = {
    isQuizEnabled: false
  }
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck.title
  })
  onAddCard = () => {

  }
  onStartQuiz = () => {

  }
  render() {
    const { deck } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cardCount}>{deck.questions.length > 0 ? deck.questions.length : 0} cards</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => this.props.navigation.navigate('AddCard', { deck })}
        >
          <Text>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => this.props.navigation.navigate('Quiz')}
        >
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  addButton: {
    backgroundColor: purple,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 40,
    height: 50,
    borderRadius: 10
  },
  quizButton: {
    backgroundColor: gray,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    margin: 40,
    height: 50,
    borderRadius: 10
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

export default DeckDetail