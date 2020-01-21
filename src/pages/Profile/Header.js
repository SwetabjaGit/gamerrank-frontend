import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  colors,
  Typography
} from '@material-ui/core';
//import HeaderImage from '../../images/beast-logo.png';
import NavbarButton from '../../utils/NavbarButton';

// Icons
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  profile: {
    margin: 'auto auto',
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%'
      }
    },
    '& .profile-image': {
      width: 150,
      height: 150,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: '#00bcd4'
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer'
      }
    }
  },
  bannerText1: {
    color: '#fff',
    fontWeight: 'bold',
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
    backgroundColor: '#5CB85C',
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    position: 'relative',
    height: 350,
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
  },
  imagePicker: {
    color: '#fff',
    marginLeft: -100
  }
}));

const Header = (props) => {
  const { user, match, className, ...rest } = props;

  const classes = useStyles();

  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById('imageInput');
    fileInput.click();
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div
        className={classes.cover}
      >
        <div className={classes.profile}>
          <div className="image-wrapper">
            <input
              type="file" 
              id="imageInput"
              hidden="hidden"
              onChange={handleImageChange}
            />
            <img
              src={user.imageUrl}
              alt="profile"
              className="profile-image"
              onClick={handleEditPicture}
            />
            <NavbarButton
              tip="Change Image"
              onClick={handleEditPicture}
              btnClassName={classes.button}
            >
              <EditIcon 
                color="primary"
                className={classes.imagePicker}
              />
            </NavbarButton>
          </div>
          <hr />

          <Typography
            className={classes.bannerText1}
            variant="h2"
          >
            { user.handle }
          </Typography>
          <Typography
            className={classes.bannerText2}
            variant="h5"
          >
            { user.bio }
          </Typography>
          <Typography
            className={classes.bannerText2}
            variant="h5"
          >
            { user.location }
          </Typography>
          <Typography
            className={classes.bannerText2}
            variant="h5"
          >
            { user.website }
          </Typography>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
