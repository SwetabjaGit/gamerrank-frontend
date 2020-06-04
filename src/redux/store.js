import { 
  createStore, 
  combineReducers, 
  applyMiddleware, 
  compose 
} from 'redux';
import thunk from 'redux-thunk';

// Reducers
import userReducer from './reducers/user';
import screamsReducer from './reducers/screams';
import uiReducer from './reducers/uireducer';
import alertReducer from './reducers/alerts';
import profileReducer from './reducers/profile';
import tracksReducer from './reducers/tracks';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: screamsReducer,
  UI: uiReducer,
  alerts: alertReducer,
  profile: profileReducer,
  tracks: tracksReducer
});

const store = createStore(
  reducers, 
  initialState,
  compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === 'development' && (
      window.__REDUX_DEVTOOLS_EXTENSION__ 
      && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )
);

export default store;

