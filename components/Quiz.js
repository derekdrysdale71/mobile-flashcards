import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert, Animated } from 'react-native'

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

  onToggleCard = () => {
    this.setState({ showAnswer: !this.state.showAnswer })
  }

  onRecordResult = isCorrect => {
    this.setState({
      index: this.state.index++,
      correctCount: isCorrect && this.state.correctCount++,
    })
  }

  // Should probably break these out into individual components
  renderQuiz() {
    const { index, showAnswer } = this.state
    const { questions } = this.props.deck
    return (
      <View style={styles.container}>
        <Text>Card {index + 1} / {questions.length}</Text>
        {!showAnswer ? this.renderQuestion() : this.renderAnswer()}
        <View style={styles.container}>
          <TouchableOpacity style={styles.button}>
            <Text>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderQuestion() {
    const { index } = this.state
    const { questions } = this.props
    console.log('Index:', index)
    let question = questions[index]['question']
    //const { question } = questions[index] || 'not set'
    console.log('Questions:', questions)
    console.log('Question:', question)
    return (
      <Animated.View style={styles.container}>
        <View>
          <Text style={styles.cardText}>{question}</Text>
        </View>
        <Button onPress={this.onToggleCard} title="Answer" />
        <View>
        </View>
      </Animated.View>
    )
  }

  renderAnswer() {
    const { index } = this.state
    const answer = this.props.questions[index]['answer']
    return (
      <Animated.View style={styles.container}>
        <View>
          <Text style={styles.cardText}>{answer}</Text>
        </View>
        <Button onPress={this.onToggleCard} title="Question" />
      </Animated.View>
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
  cardText: {
    fontSize: 50
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#CCC8C8',
    padding: 10,
    borderRadius: 10,
  }
});

const mapStateToProps = (state, { navigation }) => {
  const { title } = navigation.state.params
  return {
    title,
    deck: state[title],
    questions: state[title].questions
  }
}

export default connect(mapStateToProps)(Quiz)