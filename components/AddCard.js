import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { white, gray, blue, purple } from '../utils/colors'

function SubmitBtn({ onPress }) {
  return (
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={onPress}>
      <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }
  static navigationOptions = ({ navigation }) => ({
    title: `Add Card to ${navigation.state.params.deck.title}`
  })
  onSubmit = () => {

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
        <SubmitBtn onPress={this.onSubmit} />
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
  iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 30,
    marginRight: 30,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
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

export default AddCard