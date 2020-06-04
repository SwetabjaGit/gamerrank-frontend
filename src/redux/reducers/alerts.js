import {
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
  showFollowAlert: false,
  showUnfollowAlert: false,
  showFollowbackAlert: false,
  showRevokefollowAlert: false
};

export default (state = initialState, action) => {
  switch(action.type) {
    case SHOW_FOLLOW_ALERT:
      return {
        ...state,
        showFollowAlert: true
      };
    case HIDE_FOLLOW_ALERT:
      return {
        ...state,
        showFollowAlert: false
      };
    case SHOW_UNFOLLOW_ALERT:
      return {
        ...state,
        showUnfollowAlert: true
      };
    case HIDE_UNFOLLOW_ALERT:
      return {
        ...state,
        showUnfollowAlert: false
      };
    case SHOW_FOLLOWBACK_ALERT:
      return {
        ...state,
        showFollowbackAlert: true
      };
    case HIDE_FOLLOWBACK_ALERT:
      return {
        ...state,
        showFollowbackAlert: false
      };
    case SHOW_REVOKEFOLLOW_ALERT:
      return {
        ...state,
        showRevokefollowAlert: true
      };
    case HIDE_REVOKEFOLLOW_ALERT:
      return {
        ...state,
        showRevokefollowAlert: false
      };
    default:
      return state;
  }
}