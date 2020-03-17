import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchArticlesByTag } from '../../redux/actions/dataActions';



const useStyles = makeStyles((theme) => ({
  tagHeading: {
    width: '100%',
    margin: theme.spacing(3)
  },
  tagBox: {
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(3),
    padding: theme.spacing(2),
    backgroundColor: '#DEDEDE',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const Tags = (props) => {

  const [tags, setTags] = useState(null);
  const classes = useStyles();
  const { fetchArticlesByTag } = props;

  const fetchTags = async (source) => {
    await axios.get('/tags', { cancelToken: source.token })
      .then(res => {
        setTags(res.data.tags);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    fetchTags(source);

    return () => {
      source.cancel();
    };
  }, []);

  const createTag = str => {
    return '#' + str;
  };

  const handleTagClick = (tag) => {
    console.log('SelectedTag', tag);
    fetchArticlesByTag(tag);
  };

  const renderTags = tags ? (
    tags.map(tag => 
      <Chip
        key={tag}
        label={tag} 
        component="a" 
        href={createTag(tag)} 
        clickable
        onClick={() => handleTagClick(tag)}
        style={{
          backgroundColor: '#687077',
          color: '#fff'
        }}
      />)
  ) : <p>Loading...</p>;

  return (
    <div className={classes.tagBox}>
      <Typography className={classes.tagHeading} variant="h5">Popular Tags</Typography>
      {renderTags}
    </div>
  );
};


Tags.propTypes = {
  fetchArticlesByTag: PropTypes.func.isRequired,
  tagArticles: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  tagArticles: state.data.tagArticles
});

const mapActionsToProps = {
  fetchArticlesByTag
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Tags);
