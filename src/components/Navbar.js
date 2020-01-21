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
  Input,
  colors,
  Popper,
  Paper,
  Typography,
  Tooltip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/LockOutlined';
import InputIcon from '@material-ui/icons/Input';
import MenuIcon from '@material-ui/icons/Menu';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import SearchIcon from '@material-ui/icons/Search';

import axios from '../utils/axios';
import useRouter from '../utils/useRouter';
import PricingModal from './PricingModal';
import NotificationsPopover from './NotificationsPopover';



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
  search: {
    backgroundColor: 'rgba(255,255,255, 0.1)',
    borderRadius: 4,
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: 'inherit'
  },
  searchInput: {
    flexGrow: 1,
    color: 'inherit',
    '& input::placeholder': {
      opacity: 1,
      color: 'inherit'
    }
  },
  searchPopper: {
    zIndex: theme.zIndex.appBar + 100
  },
  searchPopperContent: {
    marginTop: theme.spacing(1)
  },
  trialButton: {
    marginLeft: theme.spacing(2),
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  trialIcon: {
    marginRight: theme.spacing(1)
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
  const searchRef = useRef(null);
  const notificationsRef = useRef(null);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [openSearchPopover, setOpenSearchPopover] = useState(false);
  const [searchValue, setSearchValue] = useState('');
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

  const handleLogout = () => {
    history.push('/auth/login');
    // dispatch(logout());
  };

  const handlePricingOpen = () => {
    setPricingModalOpen(true);
  };

  const handlePricingClose = () => {
    setPricingModalOpen(false);
  };

  const handleNotificationsOpen = () => {
    setOpenNotifications(true);
  };

  const handleNotificationsClose = () => {
    setOpenNotifications(false);
  };

  const handleSearchChange = event => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchPopover) {
        setOpenSearchPopover(true);
      }
    } else {
      setOpenSearchPopover(false);
    }
  };

  const handleSearchPopverClose = () => {
    setOpenSearchPopover(false);
  };

  const popularSearches = [
    'Devias React Dashboard',
    'Devias',
    'Admin Pannel',
    'Project',
    'Pages'
  ];

  const searchField = (
    <div>
      <div
        className={classes.search}
        ref={searchRef}
      >
        <SearchIcon className={classes.searchIcon} />
        <Input
          className={classes.searchInput}
          disableUnderline
          onChange={handleSearchChange}
          placeholder="Search people &amp; places"
          value={searchValue}
        />
      </div>
      <Popper
        anchorEl={searchRef.current}
        className={classes.searchPopper}
        open={openSearchPopover}
        transition
      >
        <ClickAwayListener onClickAway={handleSearchPopverClose}>
          <Paper
            className={classes.searchPopperContent}
            elevation={3}
          >
            <List>
              {popularSearches.map(search => (
                <ListItem
                  button
                  key={search}
                  onClick={handleSearchPopverClose}
                >
                  <ListItemIcon>
                    <SearchIcon />
                  </ListItemIcon>
                  <ListItemText primary={search} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </div>
  );

  const trialExpired = (
    <Button
      className={classes.trialButton}
      onClick={handlePricingOpen}
      variant="contained"
    >
      <LockIcon className={classes.trialIcon} />
      Trial expired
    </Button>
  );

  const loggedOutButtons = (
    <ButtonGroup
      color="inherit"
      aria-label="outlined button group">
      <Button>Home</Button>
      <Button>Sign In</Button>
      <Button>Sign Up</Button>
    </ButtonGroup>
  );

  const loggedInButtons = (
    <ButtonGroup
      color="inherit"
      aria-label="outlined button group">
      <Button>Home</Button>
      <Button>New Article</Button>
      <Button>Settings</Button>
    </ButtonGroup>
  );

  const signupIcon = (
    <Tooltip key="signupIcon" title="Signup" aria-label="add">
      <Link to="/signup">
        <IconButton
          className={classes.notificationsButton}
          color="inherit"
        >
          <PersonAddIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );

  const loginIcon = (
    <Tooltip key="loginIcon" title="Login" aria-label="add">
      <Link to="/login">
        <IconButton
          className={classes.notificationsButton}
          color="inherit"
        >
          <LockOpenIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );

  const homeIcon = (
    <Tooltip key="homeIcon" title="Home" aria-label="add">
      <Link to="/">
        <IconButton
          className={classes.notificationsButton}
          color="inherit"
        >
          <HomeIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );

  const newArticleIcon = (
    <Tooltip key="newArticleIcon" title="New Article" aria-label="add">
      <Link to="/newarticle">
        <IconButton
          className={classes.notificationsButton}
          color="inherit"
        >
          <PostAddIcon />
        </IconButton>
      </Link>
    </Tooltip>
  );

  const settingsIcon = (
    <Tooltip key="settingsIcon" title="Settings" aria-label="add">
      <IconButton
        className={classes.notificationsButton}
        color="inherit"
      >
        <SettingsIcon />
      </IconButton>
    </Tooltip>
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
          classes={{ badge: classes.notificationsBadge }}
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

  const signoutButton = (
    <Button
      key="signoutButton"
      className={classes.logoutButton}
      color="inherit"
      onClick={handleLogout}
    >
      <InputIcon className={classes.logoutIcon} />
      Sign out
    </Button>
  );

  const loggedOutIconTray = ([
    homeIcon,
    signupIcon,
    loginIcon
  ]);

  const loggedInIconTray = ([
    homeIcon,
    newArticleIcon,
    settingsIcon,
    notifictionIcon,
    userProfile
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
