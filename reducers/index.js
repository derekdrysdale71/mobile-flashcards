import { GET_DECKS, ADD_DECK, ADD_CARD } from '../actions/types'

export default (state = {}, action) => {
  const { decks, deck, card } = action
  console.log('Action:', action)
  console.log('Decks:', decks || 'Not Set')
  console.log('Deck:', deck || 'Not Set')
  console.log('Card:', card || 'Not Set')
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...deck
      }
    case ADD_CARD:
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [...state[deck].questions, card]
        }
      }
    default:
      return state
  }
}