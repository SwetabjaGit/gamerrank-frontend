import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';


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
    backgroundColor: '#F3F3F3',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

const Tags = () => {

  const [tags, setTags] = useState(null);
  const classes = useStyles();

  const fetchTags = () => {
    axios.get('http://conduit.productionready.io/api/tags')
      .then(res => {
        console.log(res.data.tags);
        setTags(res.data.tags);
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const createTag = str => {
    return '#' + str;
  };

  const renderTags = tags ? (
    tags.map(tag => 
      <Chip
        key={tag}
        label={tag} 
        component="a" 
        href={createTag(tag)} 
        clickable 
        style={{
          backgroundColor: '#687077',
          color: '#fff'
        }}
      />)
  ) : <p>Loading...</p>

  return (
    <div className={classes.tagBox}>
      <Typography className={classes.tagHeading} variant="h5">Popular Tags</Typography>
      {renderTags}
    </div>
  );
};

export default Tags;
