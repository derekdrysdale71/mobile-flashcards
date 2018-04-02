import React, { Component } from 'react'
import { StyleSheet, Text, View, StatusBar } from 'react-native'
import { StackNavigator, } from 'react-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import reducer from './reducers'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { gray, white, purple } from './utils/colors'

function MyStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList
  },
  AddDeck: {
    screen: AddDeck
  },
  DeckDetail: {
    screen: DeckDetail
  },
  AddCard: {
    screen: AddCard
  },
  Quiz: {
    screen: Quiz
  }
},
  {
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
        height: 30
      }
    }
  })

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <MyStatusBar backgroundColor={gray} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
