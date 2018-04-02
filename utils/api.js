import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, formatResults } from './_deck'

export const fetchDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatResults)
}

export const fetchDeck = (title) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY, key)
    .then()
}

export const saveDeckTitle = title => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: { title: title, questions: [] }
  }))
}

export const addCardToDeck = (title, card) => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [key]: deck
  }))
}