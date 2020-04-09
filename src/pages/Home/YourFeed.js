import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

//Components
import ScreamSkeleton from '../../utils/ScreamSkeleton';
import ArticleItem from '../../components/ArticleItem';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchUsersFeed } from '../../redux/actions/userActions';


const TagFilter = (props) => {

  const { feedArticles, loadingFeed, fetchUsersFeed } = props;


  useEffect(() => {
    fetchUsersFeed();
  }, [fetchUsersFeed]);

  useEffect(() => {
    console.log(feedArticles);
  }, [feedArticles]);


  const articlesList = loadingFeed ? (
    <ScreamSkeleton />
  ) : (
    feedArticles.map(scream => <ArticleItem key={scream.screamId} scream={scream}></ArticleItem>)
  );

  return (
    <div>
      { articlesList }
    </div>
  );
};


TagFilter.propTypes = {
  feedArticles: PropTypes.array.isRequired,
  loadingFeed: PropTypes.bool.isRequired,
  fetchUsersFeed: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  feedArticles: state.user.feed,
  loadingFeed: state.user.loadingFeed
});

const mapActionsToProps = {
  fetchUsersFeed
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(TagFilter);