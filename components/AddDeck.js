import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { saveDeckTitle } from '../utils/api'
import { addDeck } from '../actions'
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

class AddDeck extends Component {
  state = {
    title: ''
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Deck'
  })

  onSubmit = () => {
    const { title } = this.state
    if (title === '') {
      return Alert.alert('Incomplete', 'Please supply a title for your deck')
    }
    // Save to AsyncStorage and update store
    saveDeckTitle(title)
      .then(() => this.props.addNewDeck({
        [title]: { title: title, questions: [] }
      }))
      .catch(error => console.log(error))
      .then(() => this.setState(() => ({ title: '' })))
      .then(() => this.onNavigate(title))
  }

  onNavigate = title => {
    const resetAction = NavigationActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: { title: title } })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }
  render() {
    const { title } = this.state
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.text}>What is the title of your new Deck?</Text>
        <TextInput style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(title) => this.setState({ title })}
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

const mapDispatchToProps = dispatch => ({
  addNewDeck: deck => dispatch(addDeck(deck))
})

export default connect(null, mapDispatchToProps)(AddDeck)