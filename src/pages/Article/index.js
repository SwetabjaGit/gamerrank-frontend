import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
//import PropTypes from 'prop-types';

// Components
import Header from '../../components/Header';
import PostCard from './PostCard';


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
    minHeight: 1000,
    margin: '0 auto',
    marginTop: theme.spacing(2)
  },
  post: {
    marginBottom: theme.spacing(2)
  },
}));


const Article = (props) => {

  const { match } = props;
  const classes = useStyles();
  const screamId = match.params.articleId;

  const [scream, setScream] = useState({});


  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const fetchScream = async (source) => {
      console.log('screamId', match.params.articleId);
      await axios.get(`/scream/${screamId}`, { cancelToken: source.token })
        .then(res => {
          console.log(res.data);
          setScream(res.data)
        })
        .catch(err => {
          if(axios.isCancel(err)) {
            console.log("cancelled");
          } else {
            console.error(err);
          }
        });
    };

    fetchScream(source);

    return () => {
      source.cancel();
    };
  }, [match.params.articleId, screamId]);

  return (
    <div className={classes.root}>
      <Header
        title="This is the TITLE"
        description="This is the Description"
      />
      <div className={classes.posts}>
        <PostCard
          className={classes.post}
          key={screamId}
          scream={scream}
        />
      </div>
    </div>
  );


};

export default withRouter(Article);