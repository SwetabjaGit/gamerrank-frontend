import React, { useEffect } from 'react';
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
import Header from '../../components/Header';
import GlobalFeed from './GlobalFeed';
import YourFeed from './YourFeed';
import TagFilter from './TagFilter';
import Tags from './Tags';

//Redux Stuff
import { connect } from 'react-redux';
import { fetchArticles } from '../../redux/actions/dataActions';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: '0 auto',
    backgroundColor: '#F4F6F8'
  },
  feed: {
    margin: '0 auto',
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
  tagHeading: {
    width: '100%',
    margin: theme.spacing(3)
  },
  tagBox: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: '#F3F3F3',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const Home = (props) => {

  const { match, history, authenticated, fetchArticles, articles } = props;
  const classes = useStyles();
  const { tab } = match.params;


  useEffect(() => {
    (articles.length === 0) && fetchArticles();
  }, [fetchArticles, articles]);


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
    return <Redirect to='/globalfeed' />;
  }
  if(!tabs.find(t => t.value === tab)) {
    return <Redirect to="/" />;
  }

  return (
    <div className={classes.root}>
      <Header
        title="CONDUIT"
        description="A place to share your knowledge"
      />
      <Grid className={classes.feed} container spacing={1}>
        <Grid item sm={9} xs={12}>
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
        </Grid>
        <Grid item sm={3} xs={12}>
          <Tags />
        </Grid>
      </Grid>
    </div>
  );
};

Home.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  articles: state.data.articles
});

const mapActionsToProps = {
  fetchArticles
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(Home))


