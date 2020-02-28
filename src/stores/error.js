// action type
export const GET_ERRORS = 'GET_ERRORS';

// action creator


// initialState

const initialState = {};

// reducers
export default function(state = initialState, action ) {
  switch(action.type) {
    case GET_ERRORS:
      return action.payload;
    default: 
      return state;
  }
}

