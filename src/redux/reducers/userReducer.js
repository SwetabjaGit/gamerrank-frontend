import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  FETCH_NOTIFICATIONS
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  notificationsDummy: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        credentials: action.payload.credentials,
        likes: action.payload.likes,
        notifications: action.payload.notifications
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true
      };
    case FETCH_NOTIFICATIONS:
      return {
        ...state,
        notificationsDummy: action.payload
      };
    default:
      return state;
  }
}