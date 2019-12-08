import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/styles';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

// Components
import theme from './theme';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Article from './pages/Article';
import Editor from './pages/Editor';
import Profile from './pages/Profile';
import ProfileFavorites from './pages/ProfileFavorites';
import Settings from './pages/Settings';
import SwitchRoute from './utils/SwitchRoute';
import './utils/accountMock';


const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    marginTop: 60
  }
}));

let authenticated = true;
const history = createBrowserHistory();
axios.defaults.baseURL = 'https://us-central1-socialape-d8699.cloudfunctions.net/api';



const App = () => {

  const classes = useStyles();
  const renderHome = () => {
    return (
      <Home
        history={history} 
        authenticated={authenticated}
      />
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router history={history}>
          <Navbar authenticated={authenticated} />
          <div>
            <Switch>
              <Route exact path="/:tab" component={renderHome} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              {/* <Route exact path="/editor/:slug" component={Editor} />
              <Route exact path="/editor" component={Editor} />
              <Route exact path="/article/:id" component={Article} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/@:username/favorites" component={ProfileFavorites} />
              <Route exact path="/@:username" component={Profile} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
};



export default App;
