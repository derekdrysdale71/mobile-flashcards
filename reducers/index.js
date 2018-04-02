import { GET_DECKS } from '../actions/types'

export default (state = {}, action) => {
  console.log('Action:', action)
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      }
    default:
      return state
  }
}