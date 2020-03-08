import React, { useState, useEffect } from 'react';
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

const useStyles = makeStyles(() => ({
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


let authenticated = false;
const token = localStorage.FBIdToken;
if(token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp * 1000 < Date.now()){
    authenticated = false;
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/login';
  } else {
    authenticated = true;
    axios.defaults.headers.common['Authorization'] = token;
  }
  console.log('authenticated', authenticated);
};


const App = () => {

  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const renderHome = () => {
    return (
      <Home
        history={history} 
        authenticated={authenticated}
      />
    );
  };

  useEffect(() => {
    const fetchUserDetails = () => {
      if(authenticated){
        axios.get('/user')
          .then(res => {
            console.log(res.data.credentials.handle);
            setCurrentUser(res.data.credentials.handle);
            setUserImage(res.data.credentials.imageUrl);
          })
          .catch(err => {
            console.error(err);
          });
      }
    };
    fetchUserDetails();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router history={history}>
          <Navbar 
            authenticated={authenticated}
            currentUser={currentUser}
            userImage={userImage} 
          />
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
    </ThemeProvider>
  );
};



export default App;
