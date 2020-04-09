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
  STOP_LOADING_TRACKS,
  FILTER_BY_TAG,
  LOADING_TAG_ARTICLE,
  STOP_LOADING_TAG_ARTICLE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_BACK,
  REVOKE_FOLLOW_BACK,
  CLEAR_FOLLOWER,
  POST_ARTICLE
} from '../types';

const initialState = {
  articles: [],
  tagArticles: [],
  article: {},
  profile: {},
  follower: {
    followId: null,
    followedId: null,
    followedBack: false,
  },
  tracks: [],
  nextHref: null,
  hasMoreItems: true,
  loading: false,
  loadingTagArticles: false,
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
    case SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        follower: action.payload.follower
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
    
    
    case FOLLOW_USER:
      return {
        ...state,
        follower: {
          ...state.follower,
          followId: action.payload.followId
        }
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        follower: {
          ...state.follower,
          followId: null
        }
      };
    case FOLLOW_BACK:
      return {
        ...state,
        follower: {
          ...state.follower,
          followedBack: true
        }
      };
    case REVOKE_FOLLOW_BACK:
      return {
        ...state,
        follower: {
          ...state.follower,
          followedBack: false
        }
      };
    case CLEAR_FOLLOWER:
      return {
        ...state,
        follower: {
          followId: null,
          followedId: null,
          followedBack: false
        }
      };
    default:
      return state;
  }
};

