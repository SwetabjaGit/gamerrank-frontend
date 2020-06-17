import {
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  FIND_FOLLOWER,
  FIND_FOLLOWED,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_BACK,
  REVOKE_FOLLOW_BACK,
  CLEAR_FOLLOWER,
} from '../types';
import axios from 'axios';
import { DEBUG } from '../../config/constants';



export const findFollower = (userHandle) => (dispatch) => {
  axios.get(`/findfollower/${userHandle}`)
    .then((res) => {
      dispatch({
        type: FIND_FOLLOWER,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const findFollowed = (userHandle) => (dispatch) => {
  axios.get(`/findfollowed/${userHandle}`)
    .then((res) => {
      dispatch({
        type: FIND_FOLLOWED,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const handleFollow = (userHandle) => (dispatch) => {
  DEBUG && console.log('HandleFollow Called');
  axios.post(`/user/${userHandle}/follow`)
    .then((res) => {
      DEBUG && console.log(`${userHandle} followed`);
      dispatch({
        type: FOLLOW_USER,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const handleUnfollow = (followId, userHandle) => (dispatch) => {
  DEBUG && console.log('HandleUnfollow Called');
  axios.delete(`/user/${followId}/unfollow`)
    .then((res) => {
      DEBUG && console.log(`${userHandle} unfollowed`);
      dispatch({ 
        type: UNFOLLOW_USER
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const handleFollowBack = (followedId, userHandle) => (dispatch) => {
  DEBUG && console.log('HandleFollowBack Called');
  axios.post(`/user/${followedId}/followBack`)
    .then((res) => {
      DEBUG && console.log(`${userHandle} followed back`);
      dispatch({ 
        type: FOLLOW_BACK
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const handleRevokeFollowBack = (followedId, userHandle) => (dispatch) => {
  DEBUG && console.log('RevokeFollowBack Called');
  axios.post(`/user/${followedId}/revokeFollowBack`)
    .then((res) => {
      DEBUG && console.log(`${userHandle} Unfollowed`);
      dispatch({ 
        type: REVOKE_FOLLOW_BACK
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const clearFollower = () => (dispatch) => {
  dispatch({ type: CLEAR_FOLLOWER });
};


export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
  dispatch({ type: STOP_LOADING_UI });
};


export const setErrors = (error) => (dispatch) => {
  DEBUG && console.log(error);
  dispatch({
    type: SET_ERRORS,
    payload: error
  });
  dispatch({ type: STOP_LOADING_UI });
};