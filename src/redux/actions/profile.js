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


export const fetchProfile = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: LOADING_PROFILE });
  axios.get(`/user/${userHandle}`)
    .then((res) => {
      console.log('UserDetails', res.data);
      dispatch({
        type: SET_PROFILE,
        payload: res.data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_PROFILE });
    })
    .catch((err) => {
      console.error(err);
      dispatch(setErrors(err));
      dispatch({ type: STOP_LOADING_PROFILE });
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
  console.log(error);
  dispatch({
    type: SET_ERRORS,
    payload: error
  });
  dispatch({ type: STOP_LOADING_UI });
};