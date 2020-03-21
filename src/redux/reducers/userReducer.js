import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  FETCH_NOTIFICATIONS,
  FIND_FOLLOWER,
  FIND_FOLLOWED,
  SHOW_FOLLOW_ALERT,
  HIDE_FOLLOW_ALERT,
  SHOW_UNFOLLOW_ALERT,
  HIDE_UNFOLLOW_ALERT,
  SHOW_FOLLOWBACK_ALERT,
  HIDE_FOLLOWBACK_ALERT,
  SHOW_REVOKEFOLLOW_ALERT,
  HIDE_REVOKEFOLLOW_ALERT,
} from '../types';

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {},
  likes: [],
  followers: {},
  notifications: [],
  notificationsDummy: [],
  followAlert: {
    showFollowAlert: false,
    showUnfollowAlert: false,
    showFollowbackAlert: false,
    showRevokefollowAlert: false
  }
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
      var result = action.payload.followers.reduce((map, obj) => {
        let hashKey = obj.follower + '_' + obj.following;
        map[hashKey] = obj;
        return map;
      }, {});
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
    case SHOW_FOLLOW_ALERT:
      return {
        ...state,
        followAlert: {
          ...state.followAlert,
          showFollowAlert: true
        }
      };
    case HIDE_FOLLOW_ALERT:
      return {
        ...state,
        followAlert: {
          ...state.followAlert,
          showFollowAlert: false
        }
      };
    case SHOW_UNFOLLOW_ALERT:
      return {
        ...state,
        followAlert: {
          ...state.followAlert,
          showUnfollowAlert: true
        }
      };
    case HIDE_UNFOLLOW_ALERT:
      return {
        ...state,
        followAlert: {
          ...state.followAlert,
          showUnfollowAlert: false
        }
      };
    case SHOW_FOLLOWBACK_ALERT:
      return {
        ...state,
        followAlert: {
          ...state.followAlert,
          showFollowbackAlert: true
        }
      };
    case HIDE_FOLLOWBACK_ALERT:
      return {
        ...state,
        followAlert: {
          ...state.followAlert,
          showFollowbackAlert: false
        }
      };
    case SHOW_REVOKEFOLLOW_ALERT:
      return {
        ...state,
        followAlert: {
          ...state.followAlert,
          showRevokefollowAlert: true
        }
      };
    case HIDE_REVOKEFOLLOW_ALERT:
      return {
        ...state,
        followAlert: {
          ...state.followAlert,
          showRevokefollowAlert: false
        }
      };
    default:
      return state;
  }
}