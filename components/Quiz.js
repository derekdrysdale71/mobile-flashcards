import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Button, StyleSheet, Alert, Animated } from 'react-native'
import { white } from '../utils/colors'

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
    const questionCount = this.props.deck.questions.length
    let { index } = this.state
    isCorrect && this.setState({
      correctCount: this.state.correctCount + 1,
    })
    index < questionCount - 1
      ? this.setState({ index: index + 1 })
      : this.setState({
        index: 0,
        quizComplete: true
      })
  }

  onRestartQuiz = () => {
    this.setState({
      index: 0,
      showAnswer: false,
      quizComplete: false,
      correctCount: 0
    })
  }

  onNavigate = () => {
    this.props.navigation.goBack()
  }

  // Should probably break these out into individual components
  renderQuiz() {
    const { index, showAnswer } = this.state
    const { questions } = this.props.deck
    return (
      <View style={styles.container}>
        <Text style={styles.countText}>Card {index + 1} / {questions.length}</Text>
        {!showAnswer ? this.renderQuestion() : this.renderAnswer()}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.correctButton} onPress={() => this.onRecordResult(true)}>
            <Text style={styles.buttonText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.incorrectButton} onPress={() => this.onRecordResult(false)}>
            <Text style={styles.buttonText}>Incorrect</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  // Still would like to add animation between question and answer
  renderQuestion() {
    const { index } = this.state
    const { questions } = this.props
    console.log('Index:', index)
    const question = questions[index]['question']
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
    const { correctCount } = this.state
    const { questions } = this.props.deck
    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 30, padding: 10, textAlign: 'center' }}>
          You answered {correctCount} out of {questions.length} questions correctly!
        </Text>

        <View style={styles.button}>
          <Button
            title='Restart Quiz'
            onPress={this.onRestartQuiz}
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Back to Deck'
            onPress={this.onNavigate}
          />
        </View>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  countText: {
    fontSize: 20,
    margin: 10
  },
  cardText: {
    textAlign: 'center',
    fontSize: 50
  },
  correctButton: {
    alignItems: 'center',
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    width: 200,
    height: 50,
    marginBottom: 10
  },
  incorrectButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    width: 200,
    height: 50
  },
  buttonText: {
    color: white,
    textAlign: 'center',
    fontSize: 20
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
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