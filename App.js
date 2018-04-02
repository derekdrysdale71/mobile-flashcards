import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native'
import { StackNavigator, } from 'react-navigation';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import reducer from './reducers'
import { Entypo } from '@expo/vector-icons'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import AddButton from './components/AddButton'
import { gray, white, purple } from './utils/colors'
import { YellowBox } from 'react-native'

function AppStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
  Home: {
    screen: DeckList,
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
        height: 20
      }
    }
  })

export default class App extends Component {
  render() {
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: componentWillUpdate is deprecated'
    ]);
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <AppStatusBar backgroundColor={gray} barStyle="light-content" />
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
