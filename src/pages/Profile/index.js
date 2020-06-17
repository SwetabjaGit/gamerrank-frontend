/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Tabs,
  Tab,
  Divider,
  colors,
  Card
} from '@material-ui/core';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// Components
import Header from './Header';
import HeaderSkeleton from '../../utils/HeaderSkeleton';
import About from './About';
import Myfeed from './Myfeed';
import Likedposts from './Likedposts';
import Connections from './Connections';
import SnackbarAlert from '../../components/SnackbarAlert';
import { IS_MOCK_ENABLED } from '../../config/constants';

// Redux Stuff
import { connect } from 'react-redux';
import {
  fetchProfile,
  clearProfile,
  fetchMockProfile
} from '../../redux/actions/profile';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#F4F6F8'
  },
  box: {
    marginLeft: 100,
    marginRight: 100
  },
  card: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  feed: {
    width: '73%',
    maxWidth: '100%',
    margin: '0 auto',
  },
  tab: {
    padding: theme.spacing(2, 3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
  },
}));


const Profile = (props) => {
  const { 
    match, history, authenticated, authUser,
    profileUser,
    profileScreams,
    profileLikedScreams,
    profileConnections,
    profileConnection,
    fetchProfile, clearProfile, fetchMockProfile
  } = props;
  const classes = useStyles();
  const { userHandle, tab } = match.params;
  const [openFAlert, setOpenFAlert] = useState(false);
  const [openUAlert, setOpenUAlert] = useState(false);
  const [openFBAlert, setOpenFBAlert] = useState(false);
  const [openUBAlert, setOpenUBAlert] = useState(false);


  useEffect(() => {
    clearProfile();
  }, [clearProfile]);


  useEffect(() => {
    userHandle && IS_MOCK_ENABLED === true
      ? fetchMockProfile('/api/user/1/profile')
      : fetchProfile(userHandle);
  }, []);


  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [];
  tabs.push({ value: 'myfeed', label: 'My Feed' });
  tabs.push({ value: 'likedposts', label: 'Liked Posts' });
  tabs.push({ value: 'connections', label: 'Connections' });

  if(!tab){
    return <Redirect to='/myfeed' />;
  }
  if(!tabs.find(t => t.value === tab)) {
    return <Redirect to="/" />;
  }

  const handleFClose = () => {
    setOpenFAlert(false);
  };

  const handleUClose = () => {
    setOpenUAlert(false);
  };

  const handleFBClose = () => {
    setOpenFBAlert(false);
  };

  const handleUBClose = () => {
    setOpenUBAlert(false);
  };

  const displayHeader = profileUser ? (
    <Header 
      user={profileUser}
      authenticated={authenticated}
      authUser={authUser}
      openFollowAlert={setOpenFAlert}
      openUnfollowAlert={setOpenUAlert} 
      openFollowbackAlert={setOpenFBAlert}
      openRevokefollowAlert={setOpenUBAlert}
    />
  ) : (
    <HeaderSkeleton />
  );

  return (
    <div className={classes.root}>
      <div className={classes.feed}>
        <Card className={classes.card}>
          {displayHeader}
        </Card>
        {profileUser && <About userInfo={profileUser}/>}
        <Card className={classes.card}>
          <Tabs
            className={classes.tabs}
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={tab}
            variant="scrollable"
          >
            {tabs.map(tab => (
              <Tab
                className={classes.tab}
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider className={classes.divider} />
          <div className={classes.content}>
            {tab === 'myfeed' && <Myfeed screams={profileScreams} /> }
            {tab === 'likedposts' && <Likedposts screams={profileLikedScreams} /> }
            {tab === 'connections' && <Connections connections={profileConnections} /> }
          </div>
        </Card>  
        <SnackbarAlert 
          open={openFAlert}
          onClose={handleFClose}
          type="success"
          message={profileUser && profileUser.handle + 'Followed Successfully'} 
        />  
        <SnackbarAlert 
          open={openUAlert} 
          onClose={handleUClose}
          type="success"
          message={profileUser && profileUser.handle + 'Unfollowed Successfully'}
        />
        <SnackbarAlert 
          open={openFBAlert} 
          onClose={handleFBClose}
          type="success"
          message={profileUser && profileUser.handle + 'Followed Back Successfully'}
        />
        <SnackbarAlert 
          open={openUBAlert} 
          onClose={handleUBClose}
          type="success"
          message={profileUser && profileUser.handle + 'Unfollowed Back Successfully'}
        />
      </div>
    </div>
  );
};

Profile.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  profile: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  authUser: PropTypes.string,
  fetchProfile: PropTypes.func.isRequired,
  clearProfile: PropTypes.func.isRequired,
  fetchMockProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  profileUser: state.profile.user,
  profileScreams: state.profile.screams,
  profileLikedScreams: state.profile.likedScreams,
  profileConnections: state.profile.connections,
  profileConnection: state.profile.connection,
  loading: state.UI.loading,
  authUser: state.user.credentials.handle,
});

const mapActionsToProps = {
  fetchMockProfile,
  fetchProfile,
  clearProfile,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(Profile));
