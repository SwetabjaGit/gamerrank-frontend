/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  AppBar,
  Avatar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  colors,
  Typography,
  Tooltip,
} from '@material-ui/core';

//Icons
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';

//import axios from '../utils/axios';
import useRouter from '../utils/useRouter';
import PricingModal from './PricingModal';
import NotificationsPopover from './NotificationsPopover';
import NavbarButton from '../utils/NavbarButton';

//Redux Stuff
import { connect } from 'react-redux';
import { logoutUser, getUserData, fetchNotifications } from '../redux/actions/userActions';


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
  
  const { authenticated, currentUser, userImage, logoutUser, notificationss, fetchNotifications } = props;

  const classes = useStyles();
  const { history } = useRouter();
  const notificationsRef = useRef(null);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [openNotifications, setOpenNotifications] = useState(false);


  useEffect(() => {
    if(authenticated){
      fetchNotifications();
    }
  }, [authenticated, fetchNotifications]);
  
  useEffect(() => {
    setNotifications(notificationss);
  }, [notificationss]);


  const handlePricingClose = () => {
    setPricingModalOpen(false);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

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
    <NavbarButton key="Logout" tip="Logout" link="" btnClassName={classes.logoutButton} onClick={logoutUser}>
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
      key="userProfile"
      to={`/profile/${currentUser}/myarticles`}
    >
      <Button
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
  onOpenNavBarMobile: PropTypes.func,
  fetchNotifications: PropTypes.func,
  logoutUser: PropTypes.func,
  getUserData: PropTypes.func,
  authenticated: PropTypes.bool,
  currentUser: PropTypes.string,
  userImage: PropTypes.string,
  notificationss: PropTypes.array
};


const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  currentUser: state.user.credentials.handle,
  userImage: state.user.credentials.imageUrl,
  notificationss: state.user.notificationsDummy
});

const mapActionsToProps = {
  logoutUser,
  getUserData,
  fetchNotifications
};


export default connect(
  mapStateToProps,
  mapActionsToProps
)(Navbar);
