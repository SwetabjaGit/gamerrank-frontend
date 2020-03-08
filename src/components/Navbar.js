/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  IconButton,
  Toolbar,
  Hidden,
  colors,
  Typography,
  Tooltip,
} from '@material-ui/core';

//Icons
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';


import axios from '../utils/axios';
import useRouter from '../utils/useRouter';
import PricingModal from './PricingModal';
import NotificationsPopover from './NotificationsPopover';
import NavbarButton from '../utils/NavbarButton';


const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
  },
  toolbar: {
    width: '70%',
    margin: '0 auto'
  },
  logoIcon: {
    color: '#fff',
    fontWeight: 'bold'
  },
  flexGrow: {
    flexGrow: 1
  },
  notificationsButton: {
    marginLeft: theme.spacing(1),
    color: '#fff'
  },
  notificationsBadge: {
    backgroundColor: colors.orange[600]
  },
  logoutButton: {
    marginLeft: theme.spacing(1)
  },
  logoutIcon: {
    marginRight: theme.spacing(1)
  },
}));

const Navbar = (props) => {
  const { authenticated, currentUser, userImage } = props;

  const classes = useStyles();
  const { history } = useRouter();
  const notificationsRef = useRef(null);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);


  useEffect(() => {
    let mounted = true;

    const fetchNotifications = () => {
      axios.get('/api/account/notifications').then(response => {
        if (mounted) {
          setNotifications(response.data.notifications);
        }
      });
    };

    fetchNotifications();

    return () => {
      mounted = false;
    };
  }, [authenticated]);

  const handlePricingClose = () => {
    setPricingModalOpen(false);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    history.push('/login');
    //window.location.href = '/login';
  }

  const signupIcon = (
    <NavbarButton key="Signup" tip="Signup" link="/signup" btnClassName={classes.notificationsButton}>
      <PersonAddIcon />
    </NavbarButton>
  );

  const loginIcon = (
    <NavbarButton key="Login" tip="Login" link="/login" btnClassName={classes.notificationsButton}>
      <LockOpenIcon />
    </NavbarButton>
  );

  const tracksIcon = (
    <NavbarButton key="Tracks" tip="Tracks" link="/tracks" btnClassName={classes.notificationsButton}>
      <TrackChangesIcon />
    </NavbarButton>
  );

  const homeIcon = (
    <NavbarButton key="Home" tip="Home" link="/" btnClassName={classes.notificationsButton}>
      <HomeIcon />
    </NavbarButton>
  );

  const newArticleIcon = (
    <NavbarButton key="NewArticle" tip="NewArticle" link="/newarticle" btnClassName={classes.notificationsButton}>
      <PostAddIcon />
    </NavbarButton>
  );

  const settingsIcon = (
    <NavbarButton key="Settings" tip="Settings" link="/settings" btnClassName={classes.notificationsButton}>
      <SettingsIcon />
    </NavbarButton>
  );

  const signoutIcon = (
    <NavbarButton key="Logout" tip="Logout" link="/login" btnClassName={classes.logoutButton} onClick={handleLogout}>
      <ExitToAppIcon />
    </NavbarButton>
  );

  const notifictionIcon = (
    <Tooltip key="notifictionIcon" title="Notifications" aria-label="add">
      <IconButton
        className={classes.notificationsButton}
        color="inherit"
        onClick={handleNotificationsOpen}
        ref={notificationsRef}
      >
        <Badge
          badgeContent={notifications.length}
          classes={{ badge: classes.notificationsBadge}}
        >
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );

  const userProfile = (
    <Link
      key={currentUser}
      to={`/profile/${currentUser}/myarticles`}
    >
      <Button
        key={currentUser}
        className={classes.logoutButton}
        color="inherit"
      >
        <Avatar 
          alt={currentUser} 
          src={userImage}
          className={classes.logoutIcon} 
        />
        {currentUser}
      </Button>
    </Link>
  );
  

  const loggedOutIconTray = ([
    homeIcon,
    tracksIcon,
    signupIcon,
    loginIcon
  ]);

  const loggedInIconTray = ([
    homeIcon,
    tracksIcon,
    newArticleIcon,
    settingsIcon,
    notifictionIcon,
    userProfile,
    signoutIcon
  ]);

  return (
    <AppBar
      className={classes.root}
      color="primary"
    >
      <Toolbar className={classes.toolbar}>
        <div>
          <Typography
            className={classes.logoIcon}
            component="h1"
            variant="h3"
          >
            CONDUIT
          </Typography>
        </div>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          {authenticated === true ? loggedInIconTray : loggedOutIconTray}
        </Hidden>
        <Hidden lgUp>
          {authenticated === true ? loggedInIconTray : loggedOutIconTray}
        </Hidden>
      </Toolbar>
      <PricingModal
        onClose={handlePricingClose}
        open={pricingModalOpen}
      />
      <NotificationsPopover
        anchorEl={notificationsRef.current}
        notifications={notifications}
        onClose={handleNotificationsClose}
        open={openNotifications}
      />
    </AppBar>
  );
};

Navbar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func
};

export default Navbar;
