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
  state = {
    ready: false
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Decks',
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('AddDeck')}>
        <Text>Add</Text>
      </TouchableOpacity>
    )
  })

  // static navigationOptions = {
  //   header: ({ navigation }) => ({
  //     right: <AddButton />
  //   })
  // }

  componentDidMount() {
    console.log("ComponentDidMount")
    fetchDecks()
      .then((decks) => this.props.getAllDecks(decks))
      .then(() => this.setState(() => ({ ready: true })))
  }

  renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.deck}
      key={item.title}
      onPress={() => this.props.navigation.navigate('DeckDetail', { deck: item })}
    >
      <Deck title={item.title} questions={item.questions} />
    </TouchableOpacity>
  )
  render() {
    const { decks } = this.props;
    const { ready } = this.state;
    const decksArray = Object.keys(decks).map(key => {
      return decks[key]
    })
    console.log('Decks Array:', decksArray)
    if (ready === false) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={decksArray}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
  }
}

const mapStateToProps = decks => ({
  decks
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
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)