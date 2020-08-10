import {
  SET_PROFILE,
  CLEAR_PROFILE,
  LOADING_PROFILE,
  STOP_LOADING_PROFILE,
  FOLLOW_USER,
  UNFOLLOW_USER,
  FOLLOW_BACK,
  REVOKE_FOLLOW_BACK,
  CLEAR_FOLLOWER,
  ADD_CONNECTION,
  WITHDRAW_REQUEST,
  ACCEPT_REQUEST,
  DISCONNECT,
  CLEAR_CONNECTION,
} from '../types';

const initialState = {
  user: {},
  screams: [],
  likedScreams: [],
  connections: [],
  connection: {
    sender: null,
    receiver: null,
    connected: false,
    status: null,
  },
  follower: {
    followId: null,
    followedId: null,
    followedBack: false,
  },
  loadingProfile: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return {
        ...state,
        user: action.payload.user,
        screams: action.payload.screams,
        likedScreams: action.payload.likedScreams,
        connections: action.payload.connections,
        follower: action.payload.follower,
      };
    case CLEAR_PROFILE:
      return initialState;
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
        follower: initialState.follower
      };

    case ADD_CONNECTION:
      return {
        ...state,
        connection: {
          ...state.connection,
          sender: action.payload.sender,
          status: action.payload.status
        }
      };
    case WITHDRAW_REQUEST:
      return {
        ...state,
        connection: {
          ...state.connection,
          sender: null,
          status: action.payload.status
        }
      };
    case ACCEPT_REQUEST:
      return {
        ...state,
        connection: {
          ...state.connection,
          connected: true,
          status: action.payload.status
        }
      };
    case DISCONNECT:
      return {
        ...state,
        connection: initialState.connection,
      };
    case CLEAR_CONNECTION:
      return {
        ...state,
        connection: initialState.connection
      };
    default:
      return state;
  }
};
