import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  colors,
  Typography
} from '@material-ui/core';
//import HeaderImage from '../images/beast-cover.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  bannerText1: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 50,
    padding: 10,
    textAlign: 'center',
    marginTop: 'auto',
  },
  bannerText2: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 'auto',
    padding: 10,
  },
  cover: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    position: 'relative',
    height: 280,
    '&:hover': {
      '& $changeButton': {
        visibility: 'visible'
      }
    }
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

const Header = props => {
  const { className, title, description, ...rest } = props;

  const classes = useStyles();

  /* const user = {
    name: 'Shen Zhi',
    bio: 'Web Developer',
    avatar: HeaderImage,
    cover: HeaderImage,
    connectedStatus: 'not_connected'
  }; */

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div
        className={classes.cover}
        style={{ backgroundColor: '#388E3C' }}
      >
        <Typography
          className={classes.bannerText1}
          variant="h1"
        >
          {title}
        </Typography>
        <Typography
          className={classes.bannerText2}
          variant="h3"
        >
          {description}
        </Typography>
      </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
