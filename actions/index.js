import { GET_DECKS, ADD_DECK } from './types'

export const getDecks = decks => ({
  type: GET_DECKS,
  decks
})

export const addDeck = deck => ({
  type: ADD_DECK,
  deck
})