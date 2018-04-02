import { GET_DECKS, ADD_DECK, ADD_CARD } from '../actions/types'

export default (state = {}, action) => {
  console.log('Action:', action)
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case ADD_DECK:
      return {
        ...state,
        ...deck
      }
    case ADD_CARD:
      return {
        ...state,
        [action.deck]: {
          title: action.deck,
          questions: [...state[action.deck].questions, card]
        }
      }
    default:
      return state
  }
}