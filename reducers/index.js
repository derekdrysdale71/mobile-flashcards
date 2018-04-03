import { GET_DECKS, ADD_DECK, ADD_CARD } from '../actions/types'

export default (state = {}, action) => {
  const { decks, deck, card } = action
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