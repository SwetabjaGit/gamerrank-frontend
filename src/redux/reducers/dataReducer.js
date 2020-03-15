import {
  SET_ARTICLES,
  LOADING_ARTICLES,
  STOP_LOADING_ARTICLES,
  SET_ARTICLE,
  CLEAR_ARTICLE,
  SET_PROFILE,
  CLEAR_PROFILE,
  SET_TRACKS,
  CLEAR_TRACKS,
  LOADING_PROFILE,
  STOP_LOADING_PROFILE,
  LOADING_TRACKS,
  STOP_LOADING_TRACKS
} from '../types';

const initialState = {
  articles: [],
  article: {},
  profile: {},
  tracks: [],
  nextHref: null,
  hasMoreItems: true,
  loading: false,
  loadingArticles: false,
  loadingProfile: false,
  loadingTracks: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.payload
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
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: {}
      };
    case LOADING_PROFILE:
      return {
        ...state,
        loadingProfile: true
      };
    case STOP_LOADING_PROFILE:
      return {
        ...state,
        loadingProfile: false
      };
    case SET_TRACKS:
      let tracks = state.tracks;
      action.payload.collection.map(track => {
        if(track.artwork_url == null) {
          track.artwork_url = track.user.avatar_url;
        }
        return tracks.push(track);
      });
      let hasMoreItemss = true;
      if(action.payload.next_href) {
        hasMoreItemss = true;
      } else {
        hasMoreItemss = false;
      }
      return {
        ...state,
        tracks: tracks,
        nextHref: action.payload.next_href,
        hasMoreItems: hasMoreItemss
      };
    case CLEAR_TRACKS:
      return {
        ...state,
        tracks: []
      };
    case LOADING_TRACKS:
      return {
        ...state,
        loadingTracks: true
      };
    case STOP_LOADING_TRACKS:
      return {
        ...state,
        loadingTracks: false
      };
    default:
      return state;
  }
};

