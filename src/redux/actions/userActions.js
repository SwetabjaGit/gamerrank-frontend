import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  FETCH_NOTIFICATIONS
} from '../types';
import axios from 'axios';
import axios2 from '../../utils/axios';


export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/login', userData)
    .then(res => {
      console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      dispatch({ type: STOP_LOADING_UI });
    });
};


export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/signup', newUserData)
    .then(res => {
      console.log(res.data);  //Store the token in browser localstorage so that we can use it later
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
      dispatch({ type: STOP_LOADING_UI });
    });
};


export const fetchNotifications = () => (dispatch) => {
  axios2.get('/api/account/notifications')
    .then(res => {
      dispatch({
        type: FETCH_NOTIFICATIONS,
        payload: res.data.notifications
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};


export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href = '/login';
};

export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.get('/user')
    .then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch(err => console.log(err));
};


const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
};