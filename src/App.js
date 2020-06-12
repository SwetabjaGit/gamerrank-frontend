import React from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Utils
import ScrollReset from './components/ScrollReset';
import {
  API_BASE_DEV,
  API_BASE_PROD
} from './config/constants';
import theme from './theme';
import store from './redux/store';
import routes from './routes';
import './utils/mock/accountMock';
import './utils/mock/chatMock';
import './utils/mock/articlesMock';
import './utils/mock/socialFeedMock';
import './utils/mock/userMock'
import './css/App.scss';

// Redux Stuff
import { Provider } from 'react-redux';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/user';


const history = createBrowserHistory();
axios.defaults.baseURL 
 = process.env.NODE_ENV === 'development' ? API_BASE_DEV : API_BASE_PROD;


const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  let authenticated;
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
    authenticated = store.getState().user.authenticated;
  }
  console.log('authenticated', authenticated);
};


const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router history={history} >
          <ScrollReset />
          {renderRoutes(routes)}
        </Router>
      </Provider>
    </ThemeProvider>
  );
};


export default App;
