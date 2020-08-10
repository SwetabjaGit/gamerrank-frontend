import {
  SET_PROFILE,
  CLEAR_PROFILE,
  LOADING_PROFILE,
  STOP_LOADING_PROFILE,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS
} from '../types';
import axios from 'axios';
import localAxios from '../../utils/axios';
import { DEBUG } from '../../config/constants'


export const fetchMockProfile = () => (dispatch) => {
  dispatch({ type: LOADING_PROFILE });
  localAxios.get('/api/user/1/profile')
    .then(res => {
      DEBUG && console.log('MockProfile: ', res.data);
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_PROFILE });
    })
    .catch(err => {
      DEBUG && console.log(err);
      dispatch(setErrors(err));
      dispatch({ type: STOP_LOADING_PROFILE });
    });
};

export const fetchProfile = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: LOADING_PROFILE });
  axios.get(`/user/${userHandle}`)
    .then((res) => {
      DEBUG && console.log('Profile: ', res.data);
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_PROFILE });
    })
    .catch((err) => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
      dispatch({ type: STOP_LOADING_PROFILE });
    });
};


export const fetchMockFeedArticles = () => (dispatch) => {
  axios.get('/api/user/1/feed-articles')
    .then(res => {
    })
    .catch(err => {
      DEBUG && console.error(err);
    });
};

export const fetchMockLikedArticles = () => (dispatch) => {
  axios.get('/api/user/1/liked-articles')
    .then(res => {
    })
    .catch(err => {
      DEBUG && console.error(err);
    });
};

export const fetchMockConnections = () => (dispatch) => {
  axios.get('/api/user/1/connections')
    .then(res => {
    })
    .catch(err => {
      DEBUG && console.error(err);
    });
};

export const clearProfile = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
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