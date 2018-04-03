import { AsyncStorage } from 'react-native'
import { DECKS_STORAGE_KEY, formatResults } from './_deck'

export const fetchDecks = () => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(formatResults)
}

export const fetchDeck = title => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(decks => decks[title])
    .catch(error => console.log(error))
}

export const saveDeckTitle = title => {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: { title: title, questions: [] }
  }))
}

export const addCardToDeck = (title, card) => {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(response => {
      const data = JSON.parse(response)
      const questions = data[title]["questions"]
      questions.push(card)
      return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
        [title]: {
          title: title,
          questions: questions
        }
      }))
    })
    .then(data => console.log('Data:', data))
    .catch(error => console.log('Error:', error))
}