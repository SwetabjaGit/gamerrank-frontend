import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

// Components
import Header from '../../components/Header';
import PostCard from './PostCard';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchOneArticle, clearArticle } from '../../redux/actions/dataActions';



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
  posts: {
    width: '60%',
    minHeight: 780,
    margin: '0 auto',
    marginTop: theme.spacing(2)
  },
  post: {
    marginBottom: theme.spacing(2)
  },
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50
  },
}));


const Article = (props) => {

  const { match, article, fetchOneArticle, loading, clearArticle } = props;
  const classes = useStyles();
  const articleId = match.params.articleId;

  // Clear Article payload on Back press
  useEffect(() => {
    window.onpopstate = () => {
      clearArticle();
    };
  }, [clearArticle]);

  useEffect(() => {
    fetchOneArticle(articleId);
  }, [articleId, fetchOneArticle]);

  useEffect(() => {
    console.log(article);
  }, [article]);
  
  

  const displayArticleCard = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <div className={classes.posts}>
      <PostCard
        className={classes.post}
        key={articleId}
        article={article}
      />
    </div>
  );

  
  return (
    <div className={classes.root}>
      <Header
        title="This is the TITLE"
        description="This is the Description"
      />
      { displayArticleCard }
    </div>
  );

};

Article.propTypes = {
  article: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchOneArticle: PropTypes.func.isRequired,
  clearArticle: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  article: state.data.article,
  loading: state.UI.loading
});

const mapActionsToProps = {
  fetchOneArticle,
  clearArticle
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(Article));