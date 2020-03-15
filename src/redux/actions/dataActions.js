import {
  SET_ARTICLES,
  LOADING_ARTICLES,
  STOP_LOADING_ARTICLES,
  CLEAR_ERRORS,
  SET_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_ARTICLE,
  CLEAR_ARTICLE,
  SET_PROFILE,
  CLEAR_PROFILE,
  SET_TRACKS,
  CLEAR_TRACKS,
  LOADING_TRACKS,
  STOP_LOADING_TRACKS,
  LOADING_PROFILE,
  STOP_LOADING_PROFILE
} from '../types';
import axios from 'axios';



export const fetchArticles = () => (dispatch) => {
  dispatch({ type: LOADING_ARTICLES });
  dispatch({ type: LOADING_UI });
  axios.get('/screams')
    .then(res => {
      console.log(res.data);
      dispatch(setArticles(res.data));
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_ARTICLES });
    })
    .catch(err => {
      console.error(err);
      dispatch(setArticles([]));
      dispatch(setErrors(err));
      dispatch({ type: STOP_LOADING_ARTICLES });
    });
};


export const setArticles = (data) => (dispatch) => {
  dispatch({
    type: SET_ARTICLES,
    payload: data
  });
};


export const fetchOneArticle = (articleId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log('Fetching Article using Actions');
  axios.get(`/scream/${articleId}`)
    .then((res) => {
      dispatch({
        type: SET_ARTICLE,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch(setErrors(err));
    });
};


export const clearArticle = () => (dispatch) => {
  dispatch({ type: CLEAR_ARTICLE });
};


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
  dispatch({
    type: SET_ERRORS,
    payload: error.response.data
  });
  dispatch({ type: STOP_LOADING_UI });
};




