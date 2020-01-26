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
import axios from 'axios';

// Components
import Header from './Header';
import HeaderSkeleton from '../../utils/HeaderSkeleton';
import MyArticles from './MyArticles';
import FavoritedArticles from './FavoritedArticles';


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

  const { match, history, location } = props;
  const classes = useStyles();
  const { userHandle, tab } = match.params;
  const [user, setUser] = useState(null);
  const [screams, setScreams] = useState(null);

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  useEffect(() => {

    const fetchUserDetails = () => {
      axios.get(`/user/${userHandle}`)
        .then(res => {
          console.log('UserDetails', res.data);
          setUser(res.data.user);
          setScreams(res.data.screams);
        })
        .catch(err => {
          console.error(err);
        });
    };

    fetchUserDetails();

  }, [userHandle]);

  const tabs = [];
  tabs.push({ value: 'myarticles', label: 'My Articles' });
  tabs.push({ value: 'favorited', label: 'Favorited Articles' });

  if(!tab){
    return <Redirect to='/myarticles' />;
  }
  if(!tabs.find(t => t.value === tab)) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      { user === null ? (
          <HeaderSkeleton />
        ) : (
          <Header user={user} />
      )}
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
            {tab === 'myarticles' && <MyArticles screams={screams} />}
            {tab === 'favorited' && <FavoritedArticles screams={screams} />}
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
  location: PropTypes.object.isRequired
};

export default withRouter(Profile);

