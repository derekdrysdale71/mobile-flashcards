import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'
import SubmitButton from './SubmitButton'
import { white, gray, blue, purple } from '../utils/colors'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Add Card to ${navigation.state.params.title}`
  })
  onSubmit = () => {
    const { title } = this.props.navigation.state.params
    console.log('onSubmit title:', title)
    const { question, answer } = this.state
    if (question === '' || answer === '') {
      return Alert.alert('Incomplete', 'Please supply a question and answer')
    }
    const card = { question: question, answer: answer }
    console.log('New Card:', card)
    // Save to AsyncStorage and update store
    addCardToDeck(title, card)
      .then(() => this.props.add(title, card))
      .then(() => this.setState(() => ({
        question: '',
        answer: ''
      }))).catch(error => console.log(error))
    // Redirect to DeckDetail
    //this.props.navigation.navigate('DeckDetail', { title: deck.title })
    Alert.alert('Success!', 'Card added to deck')
  }
  render() {
    const { question, answer } = this.state
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.newCardLabelText}>Question</Text>
        <TextInput style={styles.input}
          value={question}
          onChangeText={(question) => this.setState({ question })}
        />
        <Text style={styles.newCardLabelText}>Answer</Text>
        <TextInput style={styles.input}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30
  },
  text: {
    color: blue,
    fontSize: 16,
    marginBottom: 15
  },
  input: {
    height: 40,
    borderColor: gray,
    borderWidth: 1,
    paddingLeft: 10
  }
})

const mapStateToProps = decks => ({
  decks: Object.keys(decks).map(deck => (decks[deck]))
})

const mapDispatchToProps = dispatch => ({
  add: (deck, card) => dispatch(addCard(deck, card))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)