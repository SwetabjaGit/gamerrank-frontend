import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  FETCH_NOTIFICATIONS,
  FIND_FOLLOWER,
  FIND_FOLLOWED,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_BACK,
  REVOKE_FOLLOW_BACK,
  CLEAR_FOLLOWER
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  notifications: [],
  notificationsDummy: [],
  followId: null,
  followedId: null,
  followedBack: false
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
    case FIND_FOLLOWER:
      return {
        ...state,
        followId: action.payload.followId,
        followedBack: false
      };
    case FIND_FOLLOWED:
      return {
        ...state,
        followedId: action.payload.followedId,
        followedBack: action.payload.followedBack
      };
    case FOLLOW_USER:
      return {
        ...state,
        followId: action.payload.followId
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        followId: null
      };
    case FOLLOW_BACK:
      return {
        ...state,
        followedBack: true
      };
    case REVOKE_FOLLOW_BACK:
      return {
        ...state,
        followedBack: false
      };
    case CLEAR_FOLLOWER:
      return {
        ...state,
        followId: null,
        followedId: null,
        followedBack: false
      };
    default:
      return state;
  }
}