import {
  SET_PROFILE,
  CLEAR_PROFILE,
  LOADING_PROFILE,
  STOP_LOADING_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_BACK,
  REVOKE_FOLLOW_BACK,
  CLEAR_FOLLOWER,
} from '../types';

const initialState = {
  profile: {},
  follower: {
    followId: null,
    followedId: null,
    followedBack: false,
  },
  loadingProfile: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        follower: action.payload.follower
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {}
      };
    case LOADING_PROFILE:
      return {
        ...state,
        loadingProfile: true
      };
    case STOP_LOADING_PROFILE:
      return {
        ...state,
        loadingProfile: false
      };
    case FOLLOW_USER:
      return {
        ...state,
        follower: {
          ...state.follower,
          followId: action.payload.followId
          }
        };
    case UNFOLLOW_USER:
      return {
        ...state,
        follower: {
          ...state.follower,
          followId: null
        }
      };
    case FOLLOW_BACK:
      return {
        ...state,
        follower: {
          ...state.follower,
          followedBack: true
        }
      };
    case REVOKE_FOLLOW_BACK:
      return {
        ...state,
        follower: {
          ...state.follower,
          followedBack: false
        }
      };
    case CLEAR_FOLLOWER:
      return {
        ...state,
        follower: {
          followId: null,
          followedId: null,
          followedBack: false
        }
      };
    default:
      return state;
  }
}