import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  FETCH_NOTIFICATIONS,
  FIND_FOLLOWER,
  FIND_FOLLOWED,
  SET_USERS_FEED,
  LOADING_FEED,
  STOP_LOADING_FEED
} from '../types';
import { DEBUG } from '../../config/constants'


const initialState = {
  authenticated: false,
  loading: false,
  loadingFeed: false,
  feed: [],
  credentials: {},
  likes: [],
  followers: {},
  notifications: [],
  notificationsDummy: [],
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
    case SET_USERS_FEED:
      return {
        ...state,
        feed: action.payload
      };
    case LOADING_FEED:
      return {
        ...state,
        loadingFeed: true
      };
    case STOP_LOADING_FEED:
      return {
        ...state,
        loadingFeed: false
      };
    case SET_USER:
      var result = action.payload.followers.reduce((map, obj) => {
        let hashKey = `${obj.follower}_${obj.following}`;
        map[hashKey] = obj;
        return map;
      }, {});
      DEBUG && console.log('FollowerMap: ', result);
      return {
        ...state,
        authenticated: true,
        loading: false,
        credentials: action.payload.credentials,
        likes: action.payload.likes,
        followers: result,
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
        follower: {
          ...state.follower,
          followId: action.payload.followId,
          followedBack: false
        }
      };
    case FIND_FOLLOWED:
      return {
        ...state,
        follower: {
          ...state.follower,
          followedId: action.payload.followedId,
          followedBack: action.payload.followedBack
        }
      };
    default:
      return state;
  }
}