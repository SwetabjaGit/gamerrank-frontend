import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  FETCH_NOTIFICATIONS,
  SET_USERS_FEED,
  LOADING_FEED,
  STOP_LOADING_FEED
} from '../types';
import axios from 'axios';
import localAxios from '../../utils/axios';
import {
  IS_MOCK_ENABLED,
  DEBUG 
} from '../../config/constants';



export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/login', userData)
    .then((res) => {
      DEBUG && console.log(res.data);
      setAuthorizationHeader(res.data.token);
      IS_MOCK_ENABLED === true
        ? dispatch(getMockUserData())
        : dispatch(getUserData())
      history.push('/');
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/signup', newUserData)
    .then((res) => {
      DEBUG && console.log(res.data);  //Store the token in browser localstorage so that we can use it later
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      history.push('/');
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const getUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.get('/user')
    .then(res => {
      DEBUG && console.log('UserData: ', res.data);
      dispatch({
        type: SET_USER,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const getMockUserData = () => (dispatch) => {
  dispatch({ type: LOADING_USER });
  localAxios.get('/api/auth/user')
    .then(res => {
      DEBUG && console.log('MockUser: ', res.data);
      dispatch({
        type: SET_USER,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const fetchUsersFeed = () => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: LOADING_FEED });
  axios.get('/user/feed')
    .then((res) => {
      dispatch({
        type: SET_USERS_FEED,
        payload: res.data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_FEED });
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
      dispatch({ type: STOP_LOADING_FEED });
    })
};


export const fetchNotifications = () => (dispatch) => {
  localAxios.get('/api/account/notifications')
    .then((res) => {
      dispatch({
        type: FETCH_NOTIFICATIONS,
        payload: res.data.notifications
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      DEBUG && console.error(err);
      dispatch(setErrors(err));
    });
};


export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href = '/login';
};


export const uploadImage = (formData) => (dispatch) => {
  dispatch({ type: LOADING_USER });
  axios.post('/user/image', formData)
    .then(() => {
      dispatch(getUserData());
    })
    .catch(err => {
      DEBUG && console.log(err);
    });
};


const setAuthorizationHeader = (token) => {
  const FBIdToken = `Bearer ${token}`;
  localStorage.setItem('FBIdToken', FBIdToken);
  axios.defaults.headers.common['Authorization'] = FBIdToken;
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