import { GET_DECKS, ADD_DECK } from '../actions/types'

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
    default:
      return state
  }
}