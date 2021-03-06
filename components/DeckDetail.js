import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { white, gray, purple } from '../utils/colors'

class DeckDetail extends Component {
  state = {
    deckTitle: '',
    isQuizDisabled: false
  }

  onAddCard = () => {
    const { deck } = this.props
    this.props.navigation.navigate('AddCard', { title: deck.title })
  }

  onStartQuiz = () => {
    const { deck } = this.props
    if (!deck.questions.length) {
      return Alert.alert('The deck has no cards!', 'Please add cards to this deck')
    }
    this.props.navigation.navigate('Quiz', { title: deck.title })
  }

  render() {
    const { deck } = this.props
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.cardCount}>{deck.questions.length > 0 ? deck.questions.length : 0} cards</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={this.onAddCard}
          >
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 20 }}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quizButton}
            onPress={this.onStartQuiz}
          >
            <Text style={{ color: white, textAlign: 'center', fontSize: 20 }}>Start Quiz</Text>
          </TouchableOpacity>
        </View>

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
    justifyContent: 'center',
    borderColor: 'black',
    width: 200,
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 10
  },
  quizButton: {
    backgroundColor: 'black',
    justifyContent: 'center',
    borderColor: 'black',
    width: 200,
    height: 50,
    borderRadius: 10,
    borderWidth: 1
  },
  title: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center'
  },
  cardCount: {
    marginTop: 5,
    marginBottom: 10,
    fontSize: 25,
    color: gray,
    fontWeight: '300',
    textAlign: 'center'
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  }
})

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params
  return {
    title,
    deck: state[title]
  }
}
export default connect(mapStateToProps)(DeckDetail)