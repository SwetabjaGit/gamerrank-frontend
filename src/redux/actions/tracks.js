import {
  SET_TRACKS,
  CLEAR_TRACKS,
  LOADING_TRACKS,
  STOP_LOADING_TRACKS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS
} from '../types';
import axios from 'axios';


export const fetchTracks = (trackUrl) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: LOADING_TRACKS });
  axios.get(trackUrl)
    .then((res) => {
      if(res) {
        console.log(res.data.next_href);
        dispatch({
          type: SET_TRACKS,
          payload: res.data
        });
        dispatch(clearErrors());
      }
      dispatch({ type: STOP_LOADING_TRACKS });
    })
    .catch((err) => {
      console.error(err);
      dispatch(setErrors(err));
      dispatch({ type: STOP_LOADING_TRACKS });
    });
};


export const clearTracks = () => (dispatch) => {
  dispatch({ type: CLEAR_TRACKS });
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