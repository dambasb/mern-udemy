import { SET_ALERT, REMOVE_ALERT } from "../actions/types";

const initialState = [];

const alertReducer = (state = initialState, action) => {
  // pull out type and payload from action
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // ...state (... spread operator) - copy existing state
      // action.payload - add new alert
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alertReducer;
