import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

// Redux Stuff
import { connect } from 'react-redux';
import { fetchArticlesByTag } from '../../redux/actions/screams';

import { tags as tagConstants } from '../../config/constants'


const useStyles = makeStyles((theme) => ({
  tagBox: {
    marginTop: theme.spacing(9),
    marginLeft: theme.spacing(2),
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    }
  },
  tagHeading: {
    width: '100%',
    margin: theme.spacing(0.5, 3, 2, 1),
  },
  content: {
    margin: 0
  },
  chip: {
    backgroundColor: '#999999',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#555555',
      color: '#fff'
    }
  }
}));

const Tags = (props) => {

  const [tags, setTags] = useState(null);
  const classes = useStyles();
  const { fetchArticlesByTag } = props;

  const fetchTags = async (source) => {
    if(process.env.NODE_ENV === 'development') {
      console.log('MockTags');
      setTags(tagConstants);
    } else {
      await axios.get('/tags', { cancelToken: source.token })
        .then(res => {
          setTags(res.data.tags);
        })
        .catch(err => {
          console.error(err);
        });
    }
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
        className={classes.chip}
        key={tag}
        label={tag} 
        component="a" 
        href={createTag(tag)} 
        clickable
        onClick={() => handleTagClick(tag)}
      />)
  ) : <p>Loading...</p>;

  return (
    <div>
      <Card className={classes.tagBox}>
        <Typography className={classes.tagHeading} variant="h4">Popular Tags</Typography>
        {renderTags}
      </Card>
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
