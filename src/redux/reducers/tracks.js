import {
  SET_TRACKS,
  CLEAR_TRACKS,
  LOADING_TRACKS,
  STOP_LOADING_TRACKS,
} from '../types';

const initialState = {
  tracks: [],
  nextHref: null,
  hasMoreItems: true,
  loadingTracks: false
};

export default (state = initialState, action) => {
  switch (action.type) {
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
}