import React, { Component } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { fetchDecks } from '../utils/api'
import { getDecks } from '../actions'
import { AppLoading } from 'expo'
import { blue, gray, white } from '../utils/colors'
import Deck from './Deck'
import AddButton from './AddButton'

class DeckList extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Decks',
    headerRight: (
      <AddButton
        style={styles.addButton}
        onPress={() => navigation.navigate('AddDeck')}
      />
    )
  })

  state = {
    ready: false
  }

  componentDidMount() {
    fetchDecks()
      .then((decks) => this.props.getAllDecks(decks))
      .then(() => this.setState(() => ({ ready: true })))
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.deck}
      key={item.title}
      onPress={() => this.props.navigation.navigate('DeckDetail', { title: item.title })}
    >
      <Deck title={item.title} questions={item.questions} />
    </TouchableOpacity>
  )
  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={decks.sort((a, b) => a.title > b.title)}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
}

const mapStateToProps = decks => ({
  decks: Object.keys(decks).map(deck => (decks[deck]))
})

const mapDispatchToProps = dispatch => ({
  getAllDecks: decks => dispatch(getDecks(decks))
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'stretch'
  },
  deck: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: gray,
    borderRadius: 8,
    marginBottom: 10
  },
  addButton: {
    margin: 10
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)