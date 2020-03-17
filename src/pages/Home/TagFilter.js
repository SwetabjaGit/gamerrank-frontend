import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

//Components
import ScreamSkeleton from '../../utils/ScreamSkeleton';
import ArticleItem from '../../components/ArticleItem';

// Redux Stuff
import { connect } from 'react-redux';


const TagFilter = (props) => {

  const { tagArticles, loadingTagArticles } = props;
  

  useEffect(() => {
    console.log(tagArticles);
  }, [tagArticles]);


  const articlesList = loadingTagArticles ? (
    <ScreamSkeleton />
  ) : (
    tagArticles.map(scream => <ArticleItem key={scream.screamId} scream={scream}></ArticleItem>)
  );

  return (
    <div>
      { articlesList }
    </div>
  );
};


TagFilter.propTypes = {
  tagArticles: PropTypes.array.isRequired,
  loadingTagArticles: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  tagArticles: state.data.tagArticles,
  loadingTagArticles: state.data.loadingTagArticles
});

export default connect(
  mapStateToProps,
)(TagFilter);