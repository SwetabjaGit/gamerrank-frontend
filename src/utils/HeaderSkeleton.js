import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import { colors } from '@material-ui/core';
//import Typography from '@material-ui/core/Typography';
//import clsx from 'clsx';
//import HeaderImage from '../images/beast-cover.jpg';


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    backgroundColor: '#388E3C',
    minHeight: 425,
  },
  cover: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
  },
  changeButton: {
    position: 'absolute',
    bottom: theme.spacing(10),
    right: theme.spacing(10),
    color: theme.palette.white,
    '&:hover': {
      backgroundColor: colors.blueGrey[900]
    }
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1)
  }
}));

const HeaderSkeleton = () => {

  const classes = useStyles();

  return (
    <div className={classes.root} >
      <div className={classes.cover}>

      </div>
    </div>
  );
};

HeaderSkeleton.propTypes = {
  className: PropTypes.string
};

export default HeaderSkeleton;
