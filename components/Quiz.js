import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Alert } from 'react-native'

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title} Quiz`
  })
  state = {
    index: 0,
    showAnswer: false,
    quizComplete: false,
    correctCount: 0
  }

  renderQuiz() {
    return (
      <View style={styles.container}>
        <Text>renderQuiz</Text>
      </View>
    )
  }

  renderQuestion() {
    return (
      <View style={styles.container}>
        <Text>renderQuestion</Text>
      </View>
    )
  }

  renderAnswer() {
    return (
      <View style={styles.container}>
        <Text>renderAnswer</Text>
      </View>
    )
  }

  renderScore() {
    return (
      <View style={styles.container}>
        <Text>renderScore</Text>
      </View>
    )
  }
  render() {
    const { quizComplete } = this.state;
    return (
      <View style={styles.container}>
        {!quizComplete
          ? this.renderQuiz()
          : this.renderScore()
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
});

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params
  return {
    title,
    deck: state[title]
  }
}

export default connect(mapStateToProps)(Quiz)