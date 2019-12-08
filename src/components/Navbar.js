/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
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
    marginLeft: theme.spacing(1)
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

const Navbar = props => {
  const { authenticated, onOpenNavBarMobile, className, ...rest } = props;

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
  }, []);

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

  const imageUrl = "https://firebasestorage.googleapis.com/v0/b/socialape-d8699.appspot.com/o/SuperbBackground.jpg?alt=media&token=cfcd0465-125d-4a98-b203-d41631da9fa4";

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
    <IconButton
      key="signupIcon"
      className={classes.notificationsButton}
      color="inherit"
    >
      <PersonAddIcon />
    </IconButton>
  );

  const loginIcon = (
    <IconButton
      key="loginIcon"
      className={classes.notificationsButton}
      color="inherit"
    >
      <LockOpenIcon />
    </IconButton>
  );

  const homeIcon = (
    <IconButton
      key="homeIcon"
      className={classes.notificationsButton}
      color="inherit"
    >
      <HomeIcon />
    </IconButton>
  );

  const newScreamIcon = (
    <IconButton
      key="newScreamIcon"
      className={classes.notificationsButton}
      color="inherit"
    >
      <PostAddIcon />
    </IconButton>
  );

  const settingsIcon = (
    <IconButton
      key="settingsIcon"
      className={classes.notificationsButton}
      color="inherit"
    >
      <SettingsIcon />
    </IconButton>
  );

  const notifictionIcon = (
    <IconButton
      key="notifictionIcon"
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
  );

  const userProfile = (
    <Button
      key="userProfile"
      className={classes.logoutButton}
      color="inherit"
    >
      <Avatar alt="Swetabja Hazra" src={imageUrl} className={classes.logoutIcon} />
      Swetabja Hazra
    </Button>
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
    newScreamIcon,
    settingsIcon,
    notifictionIcon,
    userProfile
  ]);

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
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
