import React, { useState, useEffect } from 'react';
import ArticleItem from '../../components/ArticleItem';
import Paginate from '../../components/Paginate';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

//Components
import ScreamSkeleton from '../../utils/ScreamSkeleton';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchArticles } from '../../redux/actions/dataActions';



const useStyles = makeStyles(() => ({
  paginateBox: {
    width: '100%',
    alignContent: 'center',
    margin: 15
  }
}));

const GlobalFeed = (props) => {
  
  const classes = useStyles();
  const { articles, fetchArticles } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;


  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);


  const articlesList = articles ? (
    articles.map(scream => <ArticleItem key={scream.screamId} scream={scream}></ArticleItem>)
  ) : (
    <ScreamSkeleton />
  );

  let pagesCount = articlesList.length > 0 ? Math.ceil(articlesList.length / itemsPerPage) : 6;

  const paginatedList = articlesList.length > 0 ? 
    articlesList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : articlesList;

    

  return (
    <div>
      {paginatedList}
      <div className={classes.paginateBox}>
        <Paginate
          itemsPerPage={itemsPerPage}
          pagesCount={pagesCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

GlobalFeed.propTypes = {
  fetchArticles: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  articles: state.data.articles,
  loading: state.data.loading
});

const mapActionsToProps = {
  fetchArticles
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(GlobalFeed);