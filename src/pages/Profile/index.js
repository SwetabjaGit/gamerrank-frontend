import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { 
  Tabs,
  Tab,
  Divider,
  colors,
} from '@material-ui/core';
import { withRouter, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

// Components
import Header from './Header';
import HeaderSkeleton from '../../utils/HeaderSkeleton';
import ScreamSkeleton from '../../utils/ScreamSkeleton';
import MyArticles from './MyArticles';
import FavoritedArticles from './FavoritedArticles';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchProfile, clearProfile } from '../../redux/actions/dataActions';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    backgroundColor: '#F4F6F8'
  },
  box: {
    marginLeft: 100,
    marginRight: 100
  },
  feed: {
    margin: 'auto',
    width: theme.breakpoints.values.lg
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  },
}));


const Profile = (props) => {

  const { match, history, location, loading, profile, fetchProfile, clearProfile } = props;
  const classes = useStyles();
  const { userHandle, tab } = match.params;


  useEffect(() => {
    fetchProfile(userHandle);
  }, [userHandle, fetchProfile]);

  useEffect(() => {
    console.log('Profile', profile);
  }, [profile]);

  useEffect(() => {
    window.onpopstate = () => {
      clearProfile();
    };
  }, [clearProfile]);


  const handleTabsChange = (event, value) => {
    history.push(value);
  };


  const tabs = [];
  tabs.push({ value: 'myarticles', label: 'My Articles' });
  tabs.push({ value: 'favorited', label: 'Favorited Articles' });

  if(!tab){
    return <Redirect to='/myarticles' />;
  }
  if(!tabs.find(t => t.value === tab)) {
    return <Redirect to="/" />;
  }

  const displayHeader = profile.user ? (
    <Header user={profile.user} />
  ) : (
    <HeaderSkeleton />
  );


  return (
    <div className={classes.root}>
      { displayHeader }
      <Grid className={classes.feed} container spacing={1}>
        <Grid
          item 
          sm={12} 
          xs={12}
          className={classes.box}
        >
          <Tabs
            className={classes.tabs}
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={tab}
            variant="scrollable"
          >
            {tabs.map(tab => (
              <Tab
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </Tabs>
          <Divider className={classes.divider} />
          <div className={classes.content}>
            {console.log(location.pathname)}
            {tab === 'myarticles' && <MyArticles screams={profile.screams} /> }
            {tab === 'favorited' && <FavoritedArticles screams={profile.screams} /> }
          </div>
        </Grid>
        <Grid item sm={3} xs={12}>
        </Grid>
      </Grid>
    </div>
  );
};


Profile.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  profile: PropTypes.object.isRequired,
  fetchProfile: PropTypes.func.isRequired,
  clearProfile: PropTypes.func,
};

const mapStateToProps = (state) => ({
  profile: state.data.profile,
  loading: state.UI.loading
});

const mapActionsToProps = {
  fetchProfile,
  clearProfile
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(Profile));

