import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

//Components
import ScreamSkeleton from '../../utils/ScreamSkeleton';
import AddArticle from '../../components/AddArticle';
import ArticleCard from '../../components/ArticleCard';

import { 
  SCREAMS_URL,
  SCREAMS_PAGE_SIZE
} from '../../config/constants';

// Redux Stuff
import { connect } from 'react-redux';
import {
  fetchMockScreams,
  fetchArticles
} from '../../redux/actions/screams';


const useStyles = makeStyles((theme) => ({
  newArticle: {
    marginTop: theme.spacing(1),
    margin: theme.spacing(1, 0, 1, 0),
  },
  paginateBox: {
    minWidth: '100%',
    alignContent: 'center',
    margin: 25,
    zoom: 1.2
  },
  posts: {
    marginTop: theme.spacing(3)
  },
  post: {
    marginBottom: theme.spacing(3)
  },
  progress: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 30,
    zoom: 1.5
  }
}));


const GlobalFeed = (props) => {

  const {
    authenticated, loading,
    articles, nextHref, hasMoreItems,
    currentUser, userImage,
    fetchArticles, fetchMockScreams
  } = props;
  const classes = useStyles();


  const articlesList = loading ? (
    <ScreamSkeleton />
  ) : (
    articles.map(scream => (
      <ArticleCard
        className={classes.post}
        key={scream.screamId}
        scream={scream}
        avatar={userImage}
      />
    ))
  );

  
  const fetchMoreData = () => {
    var screamsUrl = `${SCREAMS_URL}/screams?page_size=${SCREAMS_PAGE_SIZE}`;
    if(nextHref){
      screamsUrl = nextHref;
    }
    fetchArticles(screamsUrl);
  };

  const loader = (
    <CircularProgress 
      className={classes.progress} 
      color="secondary" 
      style={{ color: '#D41' }} 
    />
  );

  return (
    <div>
      {authenticated && (
        <AddArticle 
          className={classes.newArticle} 
          currentUser={currentUser}
          userImage={userImage}
        />
      )}
      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMoreData}
        hasMore={hasMoreItems}
        loader={loader}
      >
        {articles.map(scream => (
          <ArticleCard
            className={classes.post}
            key={scream.screamId}
            scream={scream}
            avatar={userImage}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

GlobalFeed.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired,
  nextHref: PropTypes.string,
  hasMoreItems: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  userImage: PropTypes.string,
  fetchMockScreams: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  loading: state.data.loading,
  articles: state.data.articles,
  nextHref: state.data.nextHref,
  hasMoreItems: state.data.hasMoreItems,
  currentUser: state.user.credentials.handle,
  userImage: state.user.credentials.imageUrl,
});

const mapActionsToProps = {
  fetchMockScreams,
  fetchArticles
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(GlobalFeed);