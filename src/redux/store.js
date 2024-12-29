// store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';


// Initial state
const initialState = {
  isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true',
  user: null,
};

// Reducer function
function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, user: null };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

// Create store with redux-thunk middleware
const store = createStore(authReducer, applyMiddleware(thunk));

export default store;
