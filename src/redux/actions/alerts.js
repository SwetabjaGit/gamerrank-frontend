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


export const showFollowAlert = () => (dispatch) => {
  dispatch({ type: SHOW_FOLLOW_ALERT });
};

export const hideFollowAlert = () => (dispatch) => {
  dispatch({ type: HIDE_FOLLOW_ALERT });
};

export const showUnfollowAlert = () => (dispatch) => {
  dispatch({ type: SHOW_UNFOLLOW_ALERT });
};

export const hideUnfollowAlert = () => (dispatch) => {
  dispatch({ type: HIDE_UNFOLLOW_ALERT });
};

export const showFollowbackAlert = () => (dispatch) => {
  dispatch({ type: SHOW_FOLLOWBACK_ALERT });
};

export const hideFollowbackAlert = () => (dispatch) => {
  dispatch({ type: HIDE_FOLLOWBACK_ALERT });
};

export const showRevokeFollowAlert = () => (dispatch) => {
  dispatch({ type: SHOW_REVOKEFOLLOW_ALERT });
};

export const hideRevokeFollowAlert = () => (dispatch) => {
  dispatch({ type: HIDE_REVOKEFOLLOW_ALERT });
};