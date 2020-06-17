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
  SCREAMS_PAGE_SIZE,
  IS_MOCK_ENABLED
} from '../../config/constants';

// Redux Stuff
import { connect } from 'react-redux';
import {
  fetchMockArticles,
  fetchArticles,
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
    authenticated, UIloading, loading,
    articles, nextHref, hasMoreItems,
    currentUser, userImage,
    fetchArticles, fetchMockArticles
  } = props;
  const classes = useStyles();
  let pageCount = 0;


  const articlesList = loading ? (
    <ScreamSkeleton/>
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
    var screamsUrl = `${SCREAMS_URL}?page_size=${SCREAMS_PAGE_SIZE}`;
    if(nextHref){
      screamsUrl = nextHref;
    }
    pageCount++;
    IS_MOCK_ENABLED === true 
      ? fetchMockArticles() 
      : fetchArticles(screamsUrl);
  };

  const loader = (
    <CircularProgress
      key={`progress_${pageCount}`}
      className={classes.progress} 
      color="secondary" 
      style={{ color: '#D41' }} 
    />
  );

  const renderArticles = UIloading ? (
    <ScreamSkeleton />
  ) : (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchMoreData}
      hasMore={hasMoreItems}
      loader={articles.length === 0 ? <ScreamSkeleton key={`kk_${pageCount}`}/> : loader}
    >
      {articles.map((scream, i) => (
        <ArticleCard
          className={classes.post}
          key={`scream_${pageCount}_${i}`}
          scream={scream}
          avatar={userImage}
        />
      ))}
    </InfiniteScroll>
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
      {renderArticles}
    </div>
  );
};

GlobalFeed.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  UIloading: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired,
  nextHref: PropTypes.string,
  hasMoreItems: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  userImage: PropTypes.string,
  fetchMockArticles: PropTypes.func.isRequired,
  fetchArticles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  UIloading: state.UI.loading,
  loading: state.data.loading,
  articles: state.data.articles,
  nextHref: state.data.nextHref,
  hasMoreItems: state.data.hasMoreItems,
  currentUser: state.user.credentials.handle,
  userImage: state.user.credentials.imageUrl,
});

const mapActionsToProps = {
  fetchMockArticles,
  fetchArticles
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(GlobalFeed);