import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  FETCH_NOTIFICATIONS,
  FIND_FOLLOWER,
  FIND_FOLLOWED,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_BACK,
  REVOKE_FOLLOW_BACK,
  CLEAR_FOLLOWER
} from '../types';
import axios from 'axios';
import axios2 from '../../utils/axios';


export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/login', userData)
    .then((res) => {
      console.log(res.data);
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      history.push('/');
      dispatch(clearErrors());
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors(err));
    });
};


export const signupUser = (newUserData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/signup', newUserData)
    .then((res) => {
      console.log(res.data);  //Store the token in browser localstorage so that we can use it later
      setAuthorizationHeader(res.data.token);
      dispatch(getUserData());
      history.push('/');
      dispatch(clearErrors());
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors(err));
    });
};


export const fetchNotifications = () => (dispatch) => {
  axios2.get('/api/account/notifications')
    .then((res) => {
      dispatch({
        type: FETCH_NOTIFICATIONS,
        payload: res.data.notifications
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors(err));
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
      dispatch(clearErrors());
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors(err));
    });
};


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
      console.error(err);
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
      console.error(err);
      dispatch(setErrors(err));
    });
};


export const handleFollow = (userHandle) => (dispatch) => {
  console.log('HandleFollow Called');
  axios.post(`/user/${userHandle}/follow`)
    .then((res) => {
      console.log(`${userHandle} followed`);
      dispatch({
        type: FOLLOW_USER,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors(err));
    });
};


export const handleUnfollow = (followId, userHandle) => (dispatch) => {
  console.log('HandleUnfollow Called');
  axios.delete(`/user/${followId}/unfollow`)
    .then((res) => {
      console.log(`${userHandle} unfollowed`);
      dispatch({ type: UNFOLLOW_USER });
      dispatch(clearErrors());
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors(err));
    });
};


export const handleFollowBack = (followedId, userHandle) => (dispatch) => {
  console.log('HandleFollowBack Called');
  axios.post(`/user/${followedId}/followBack`)
    .then((res) => {
      console.log(`${userHandle} followed back`);
      dispatch({ type: FOLLOW_BACK });
      dispatch(clearErrors());
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors(err));
    });
};


export const handleRevokeFollowBack = (followedId, userHandle) => (dispatch) => {
  console.log('RevokeFollowBack Called');
  axios.post(`/user/${followedId}/revokeFollowBack`)
    .then((res) => {
      console.log(`${userHandle} Unfollowed`);
      dispatch({ type: REVOKE_FOLLOW_BACK });
      dispatch(clearErrors());
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors(err));
    });
};


export const clearFollower = () => (dispatch) => {
  dispatch({ type: CLEAR_FOLLOWER });
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
  dispatch({
    type: SET_ERRORS,
    payload: error.response.data
  });
  dispatch({ type: STOP_LOADING_UI });
};