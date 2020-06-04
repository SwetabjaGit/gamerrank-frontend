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
  FILTER_BY_TAG,
  LOADING_TAG_ARTICLE,
  STOP_LOADING_TAG_ARTICLE,
  POST_ARTICLE
} from '../types';
import axios from 'axios';
import localAxios from '../../utils/axios';


export const fetchMockScreams = () => (dispatch) => {
  dispatch({ type: LOADING_ARTICLES });
  dispatch({ type: LOADING_UI });
  localAxios.get('/api/social-feed')
    .then(res => {
      console.log('Mockdata: ', res.data.articles);
      dispatch(setArticles(res.data.articles));
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_ARTICLES });
    })
    .catch(err => {
      console.log(err);
      dispatch(setArticles([]));
      dispatch(setErrors(err));
      dispatch({ type: STOP_LOADING_ARTICLES });
    });
};


export const fetchArticles = (screamsUrl) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: LOADING_ARTICLES });
  axios.get(screamsUrl)
    .then(res => {
      if(res) {
        console.log(res.data.next_href);
        dispatch(setArticles(res.data));
        dispatch(clearErrors());
      }
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


export const fetchArticlesByTag = (tag) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  dispatch({ type: LOADING_TAG_ARTICLE });
  axios.get(`/screams/${tag}`)
    .then(res => {
      dispatch({
        type: FILTER_BY_TAG,
        payload: res.data
      });
      dispatch(clearErrors());
      dispatch({ type: STOP_LOADING_TAG_ARTICLE });
    })
    .catch(err => {
      console.error(err);
      dispatch(setErrors(err));
      dispatch({ type: STOP_LOADING_TAG_ARTICLE });
    });
};


export const fetchOneArticle = (articleId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
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


export const postArticle = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios.post('/scream', formData, {
    headers: { 
      'Content-Type': 'multipart/form-data' 
    }
  }).then((res) => {
      console.log(res.data);
      dispatch({
        type: POST_ARTICLE,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      console.error(err.data);
      dispatch(setErrors(err));
    });
};


export const uploadAndDisplay = (formData) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios({
    method: 'post',
    url: '/uploadAndDisplay',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  .then(res => {
    console.log(res.data);
    dispatch(clearErrors());
  })
  .catch(err => {
    console.log(err);
    dispatch(setErrors(err));
  });
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