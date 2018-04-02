import { GET_DECKS } from './types'

export const getDecks = decks => ({
  type: GET_DECKS,
  decks
})