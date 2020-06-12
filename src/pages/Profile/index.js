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

// Redux Stuff
import { connect } from 'react-redux';
import {
  fetchProfile,
  clearProfile
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
    profile, fetchProfile, clearProfile
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
    fetchProfile(userHandle);
  }, [userHandle, fetchProfile]);


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

  const displayHeader = profile.user ? (
    <Header 
      user={profile.user}
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
        {profile.user && <About userInfo={profile.user}/>}
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
            {tab === 'myfeed' && <Myfeed screams={profile.screams} /> }
            {tab === 'likedposts' && <Likedposts screams={profile.screams} /> }
            {tab === 'connections' && <Connections screams={profile.screams} /> }
          </div>
        </Card>  
        <SnackbarAlert 
          open={openFAlert}
          onClose={handleFClose}
          type="success"
          message={profile.user && profile.user.handle + 'Followed Successfully'} 
        />  
        <SnackbarAlert 
          open={openUAlert} 
          onClose={handleUClose}
          type="success"
          message={profile.user && profile.user.handle + 'Unfollowed Successfully'}
        />
        <SnackbarAlert 
          open={openFBAlert} 
          onClose={handleFBClose}
          type="success"
          message={profile.user && profile.user.handle + 'Followed Back Successfully'}
        />
        <SnackbarAlert 
          open={openUBAlert} 
          onClose={handleUBClose}
          type="success"
          message={profile.user && profile.user.handle + 'Unfollowed Back Successfully'}
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
  
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  profile: state.profile.profile,
  loading: state.UI.loading,
  authUser: state.user.credentials.handle,
});

const mapActionsToProps = {
  fetchProfile,
  clearProfile,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(Profile));
