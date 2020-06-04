import {
  SET_ARTICLES,
  LOADING_ARTICLES,
  STOP_LOADING_ARTICLES,
  SET_ARTICLE,
  CLEAR_ARTICLE,
  FILTER_BY_TAG,
  LOADING_TAG_ARTICLE,
  STOP_LOADING_TAG_ARTICLE,
  POST_ARTICLE
} from '../types';

const initialState = {
  articles: [],
  tagArticles: [],
  article: {},
  nextHref: null,
  hasMoreItems: true,
  loading: false,
  loadingTagArticles: false,
  loadingArticles: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      let articles = state.articles;
      action.payload.collection.map(article => {
        return articles.push(article);
      });
      let hasMoreItemss = true;
      if(action.payload.next_href) {
        hasMoreItemss = true;
      } else {
        hasMoreItemss = false;
      }
      return {
        ...state,
        articles: articles,
        nextHref: action.payload.next_href,
        hasMoreItems: hasMoreItemss
      };
    case LOADING_ARTICLES:
      return {
        ...state,
        loading: true,
        loadingArticles: true
      };
    case STOP_LOADING_ARTICLES:
      return {
        ...state,
        loading: false,
        loadingArticles: false
      };
    case POST_ARTICLE:
      return {
        ...state,
        articles: [
          ...state.articles,
          action.payload
        ]
      };
    case FILTER_BY_TAG:
      return {
        ...state,
        tagArticles: action.payload
      };
    case LOADING_TAG_ARTICLE:
      return {
        ...state,
        loadingTagArticles: true
      };
    case STOP_LOADING_TAG_ARTICLE:
      return {
        ...state,
        loadingTagArticles: false
      };
    case SET_ARTICLE:
      return {
        ...state,
        article: action.payload
      };
    case CLEAR_ARTICLE:
      const obj = {};
      return {
        ...state,
        article: obj
      };
    default:
      return state;
  }
};

