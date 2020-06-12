import React from 'react';
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
import Header from '../../components/Header'
import GlobalFeed from './GlobalFeed';
import YourFeed from './YourFeed';
import TagFilter from './TagFilter';
import Tags from './Tags';

//Redux Stuff
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    margin: '0 auto',
    backgroundColor: '#F4F6F8'
  },
  feed: {
    width: '80%',
    '@media (max-width: 1280px)' : {
      width: '90%',
    },
    '@media (max-width: 960px)' : {
      width: '100%',
    },
    maxWidth: '100%',
    margin: '0 auto',
    paddingLeft: 10
  },
  tabs: {
    width: '100%',
    display: 'flex'
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  content: {
    marginTop: theme.spacing(3)
  },
  tagHeading: {
    width: '100%',
    margin: theme.spacing(3)
  },
  tagSection: {
    zIndex: 3,
    position: 'relative'
  },
  tagsbox: {
    position: 'fixed'
  },
  articleSection: {
  },
}));

const Home = (props) => {

  const { match, history, authenticated } = props;
  const classes = useStyles();
  const { tab } = match.params;


  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  const tabs = [];

  if(authenticated){
    tabs.push({ value: 'yourfeed', label: 'Your Feed' });
    tabs.push({ value: 'globalfeed', label: 'Global Feed' });
    tabs.push({ value: 'tagfilter', label: 'Tag Filter' });
  } else {
    tabs.push({ value: 'globalfeed', label: 'Global Feed' });
  }

  if(!tab){
    return <Redirect to='/home/globalfeed' />;
  }
  if(!tabs.find(t => t.value === tab)) {
    return <Redirect to="/home" />;
  }

  const PageHeader = (
    <Header
      title="CONDUIT"
      description="A place to share your knowledge"
    />
  );

  return (
    <div className={classes.root}>
      {/* <PageHeader /> */}
      <Grid className={classes.feed} container spacing={1}>
        <Grid item md={8} sm={12} xs={12}>
          <div className={classes.articleSection}>
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
              {/* {console.log(location.pathname)} */}
              {tab === 'yourfeed' && <YourFeed />}
              {tab === 'globalfeed' && <GlobalFeed />}
              {tab === 'tagfilter' && <TagFilter />}
            </div>
          </div>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          <div className={classes.tagSection}>
            <Tags className={classes.tagsbox}/>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

Home.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

const mapActionsToProps = {
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(Home))


