import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

//Components
import ScreamSkeleton from '../../utils/ScreamSkeleton';
import ArticleItem from '../../components/ArticleItem';
import Paginate from '../../components/Paginate';
import AddArticle from '../../components/AddArticle';

// Redux Stuff
import { connect } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  newArticle: {
    marginTop: theme.spacing(4),
    margin: theme.spacing(2),
  },
  paginateBox: {
    minWidth: '100%',
    alignContent: 'center',
    margin: 25,
    marginLeft: 200,
    zoom: 1.2
  }
}));

const GlobalFeed = (props) => {
  
  const classes = useStyles();
  const { articles, loading, authenticated, currentUser, userImage } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  
  useEffect(() => {
    console.log(articles);
  }, [articles]);

  
  const articlesList = loading ? (
    <ScreamSkeleton />
  ) : (
    articles.map(scream => <ArticleItem key={scream.screamId} scream={scream}></ArticleItem>)
  );

  let pagesCount = articlesList.length > 0 ? Math.ceil(articlesList.length / itemsPerPage) : 6;

  const paginatedList = articlesList.length > 0 ? 
    articlesList.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage) : articlesList;
    

  return (
    <div>
      { authenticated && (
        <AddArticle 
          className={classes.newArticle} 
          currentUser={currentUser}
          userImage={userImage}
        />
      )}
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
  authenticated: PropTypes.bool.isRequired,
  articles: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.string,
  userImage: PropTypes.string
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  articles: state.data.articles,
  loading: state.data.loading,
  currentUser: state.user.credentials.handle,
  userImage: state.user.credentials.imageUrl,
});

const mapActionsToProps = {
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(GlobalFeed);