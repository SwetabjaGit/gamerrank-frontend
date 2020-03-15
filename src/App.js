import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import makeStyles from '@material-ui/styles/makeStyles';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Components
import './App.css';
import theme from './theme';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Tracks from './pages/Tracks';
import NewArticle from './pages/NewArticle';
import Profile from './pages/Profile';
import Article from './pages/Article/index';
import Settings from './pages/Settings';
import './utils/accountMock';

// Redux Stuff
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  mainContent: {
    marginTop: 64
  }
}));

const history = createBrowserHistory();
axios.defaults.baseURL = 'https://us-central1-socialape-d8699.cloudfunctions.net/api';
//axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


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

  const classes = useStyles();

  const renderHome = () => {
    return (
      <Home history={history} />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className={classes.root}>
          <Router history={history}>
            <Navbar />
            <div className={classes.mainContent}>
              <Switch>
                <Route exact path="/" component={renderHome} />
                <Route exact path="/tracks" component={Tracks} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/settings" component={Settings} />
                <Route exact path="/newarticle" component={NewArticle} />
                <Route exact path="/newarticle/:slug" component={NewArticle} />
                <Route exact path="/:tab" component={renderHome} />
                <Route exact path="/profile/:userHandle" component={Profile} />
                <Route exact path="/profile/:userHandle/:tab" component={Profile} />
                <Route exact path="/article/:articleId" component={Article} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
};



export default App;
