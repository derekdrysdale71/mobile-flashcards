import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import SubmitButton from './SubmitButton'
import { white, gray, blue, purple } from '../utils/colors'

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Add Card to ${navigation.state.params.title}`
  })

  state = {
    question: '',
    answer: ''
  }

  onSubmit = () => {
    const { title } = this.props.navigation.state.params
    let { question, answer } = this.state
    question = question.trim()
    answer = answer.trim()

    if (question === '' || answer === '') {
      return Alert.alert('Incomplete', 'Please supply a question and answer')
    }
    const card = { question: question, answer: answer }

    // Save to AsyncStorage and update store
    addCardToDeck(title, card)
      .then(() => this.props.add(title, card))
      .then(() => this.setState(() => ({
        question: '',
        answer: ''
      }))).catch(error => console.log(error))

    Alert.alert('Success!', 'Card added to deck')
  }
  render() {
    const { question, answer } = this.state
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.text}>Question</Text>
        <TextInput style={styles.input}
          placeholder="Question"
          value={question}
          autoFocus={true}
          onChangeText={(question) => this.setState({ question })}
        />
        <Text style={styles.text}>Answer</Text>
        <TextInput style={styles.input}
          placeholder="Answer"
          value={answer}
          onChangeText={(answer) => this.setState({ answer })}
        />
        <SubmitButton onPress={this.onSubmit} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 20
  },
  text: {
    color: blue,
    fontSize: 16,
    marginBottom: 10
  },
  input: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10
  }
})

const mapStateToProps = decks => ({
  decks: Object.keys(decks).map(deck => (decks[deck]))
})

const mapDispatchToProps = dispatch => ({
  add: (deck, card) => dispatch(addCard(deck, card))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)