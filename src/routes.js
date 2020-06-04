import React from 'react';
import { Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Components
import AuthLayout from './layouts/Auth';
import ErrorLayout from './layouts/Error';
import DashboardLayout from './layouts/Dashboard'

import Error401 from './pages/Errors/Error401';
import Error404 from './pages/Errors/Error404';
import Error500 from './pages/Errors/Error500';

import Signup from './pages/Signup';
import LoginOld from './pages/LoginOld';
import Register from './pages/Register';
import Login from './pages/Login';

import Chat from './pages/Chat';
import Welcome from './pages/Welcome/Welcome';
import Home from './pages/Home';
import Tracks from './pages/SoundCloudTracks';
import NewArticle from './pages/NewArticle';
import Article from './pages/Article/index';
import Profile from './pages/Profile';
import Settings from './pages/Settings/index';


const history = createBrowserHistory();


const renderHome = () => {
  return (
    <Home history={history} />
  );
};


const routes = [
  {
    path: '/',
    exact: true,
    component: () => <Redirect to='/welcome'/>
  },
  {
    path: '/auth',
    component: AuthLayout,
    routes: [
      {
        path: '/auth/login',
        exact: true,
        component: Login
      },
      {
        path: '/auth/register',
        exact: true,
        component: Register
      },
      {
        path: '/auth/loginold',
        exact: true,
        component: LoginOld
      },
      {
        path: '/auth/signup',
        exact: true,
        component: Signup
      },
      {
        component: () => <Redirect to='/errors/error-404'/>
      }
    ]
  },
  {
    path: '/errors',
    component: ErrorLayout,
    routes: [
      {
        path: '/errors/error-401',
        exact: true,
        component: Error401,
      },
      {
        path: '/errors/error-404',
        exact: true,
        component: Error404,
      },
      {
        path: '/errors/error-500',
        exact: true,
        component: Error500
      },
      {
        component: () => <Redirect to='/errors/error-404'/>
      }
    ]
  },
  {
    route: '*',
    component: DashboardLayout,
    routes: [
      {
        path: '/welcome',
        exact: true,
        component: Welcome
      },
      {
        path: '/home',
        exact: true,
        component: renderHome
      },
      {
        path: '/home/:tab',
        exact: true,
        component: renderHome
      },
      {
        path: '/tracks',
        exact: true,
        component: Tracks
      },
      {
        path: '/newarticle',
        exact: true,
        component: NewArticle
      },
      {
        path: '/newarticle/:slug',
        exact: true,
        component: NewArticle
      },
      {
        path: '/article/:articleId',
        exact: true,
        component: Article
      },
      {
        path: '/profile/:userHandle',
        exact: true,
        component: Profile
      },
      {
        path: '/profile/:userHandle/:tab',
        exact: true,
        component: Profile
      },
      {
        path: '/settings',
        exact: true,
        component: Settings
      },
      {
        path: '/settings/:tab',
        exact: true,
        component: Settings
      },
      {
        path: '/chat',
        exact: true,
        component: Chat
      },
      {
        path: '/chat/:id',
        exact: true,
        component: Chat
      },
      {
        component: () => <Redirect to='/errors/error-404'/>
      }
    ]
  }
];

export default routes;