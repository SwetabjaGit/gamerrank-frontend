import {
  SET_ERRORS,
  CLEAR_ERRORS,
  STOP_LOADING_UI,
  ADD_CONNECTION,
  WITHDRAW_REQUEST,
  ACCEPT_REQUEST,
  DISCONNECT,
  CLEAR_CONNECTION,
} from '../types';
import axios from 'axios';
import { DEBUG } from '../../config/constants';



export const handleAddConnection = (userHandle) => (dispatch) => {
  DEBUG && console.log('Sending Request...');
  axios.post(`/user/${userHandle}/follow`)
    .then((res) => {
      DEBUG && console.log(`Request sent to ${userHandle}`);
      dispatch({
        type: ADD_CONNECTION,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors(err));
    });
};


export const handleWithdrawRequest = (followId, userHandle) => (dispatch) => {
  DEBUG && console.log('Withdrawing Request...');
  axios.delete(`/user/${followId}/unfollow`)
    .then((res) => {
      DEBUG && console.log(`${userHandle} Request Withhdrawn`);
      dispatch({
        type: WITHDRAW_REQUEST
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const handleAcceptRequest = (followedId, userHandle) => (dispatch) => {
  DEBUG && console.log('Accepting Request...');
  axios.post(`/user/${followedId}/followBack`)
    .then((res) => {
      DEBUG && console.log(`${userHandle} Request Accepted`);
      dispatch({ 
        type: ACCEPT_REQUEST
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const handleDisconnect = (followedId, userHandle) => (dispatch) => {
  DEBUG && console.log('Disconnecting User');
  axios.post(`/user/${followedId}/revokeFollowBack`)
    .then((res) => {
      DEBUG && console.log(`${userHandle} Disconnected`);
      dispatch({ 
        type: DISCONNECT
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const clearConnection = () => (dispatch) => {
  dispatch({ type: CLEAR_CONNECTION });
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