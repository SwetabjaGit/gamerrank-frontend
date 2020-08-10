/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  colors,
  Typography,
  Button,
  Hidden,
  IconButton,
  Tooltip,
  Snackbar,
} from '@material-ui/core';
import { DEBUG } from '../../config/constants';

// Icons
import AddPhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ChatIcon from '@material-ui/icons/ChatOutlined';
//import MoreIcon from '@material-ui/icons/MoreVert';

// Redux Stuff
import { connect } from 'react-redux';
import {
  handleFollow,
  handleUnfollow,
  handleFollowBack,
  handleRevokeFollowBack,
  clearFollower,
} from '../../redux/actions/follow';


const useStyles = makeStyles(theme => ({
  root: {},
  cover: {
    position: 'relative',
    height: 300,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    '&:before': {
      position: 'absolute',
      content: '" "',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      backgroundImage:
        'linear-gradient(-180deg, rgba(0,0,0,0.00) 58%, rgba(0,0,0,0.32) 100%)'
    },
    '&:hover': {
      '& $changeButton': {
        visibility: 'visible'
      }
    }
  },
  changeButton: {
    visibility: 'hidden',
    position: 'absolute',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
    backgroundColor: colors.blueGrey[900],
    color: theme.palette.white,
    [theme.breakpoints.down('md')]: {
      top: theme.spacing(3),
      bottom: 'auto'
    },
    '&:hover': {
      backgroundColor: colors.blueGrey[900]
    }
  },
  addPhotoIcon: {
    marginRight: theme.spacing(1)
  },
  container: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    padding: theme.spacing(2, 3),
    margin: '0 auto',
    position: 'relative',
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  avatar: {
    border: `2px solid ${theme.palette.white}`,
    height: 120,
    width: 120,
    top: -60,
    left: theme.spacing(3),
    position: 'absolute'
  },
  details: {
    marginLeft: 136
  },
  actions: {
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(1)
    },
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  messageButton: {
    color: theme.palette.blue,
    '&:hover': {
      backgroundColor: theme.palette.blue,
      color: theme.palette.white
    }
  },
  addButton: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.white
    }
  },
  pendingButton: {
    color: theme.palette.secondary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.white,
    }
  },
  acceptButton: {
    color: theme.palette.blue,
    '&:hover': {
      backgroundColor: theme.palette.blue,
      color: theme.palette.white
    }
  },
  connectedButton: {
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.white
    }
  },
  personAddIcon: {
    marginRight: theme.spacing(1)
  },
  mailIcon: {
    marginRight: theme.spacing(1)
  }
}));


const Header = (props) => {
  const {
    user,
    authenticated,
    authUser,
    followers,
    clearFollower,
  } = props;
  const classes = useStyles();
  const INITIAL_CONNECT_BUTTON_STATE = {
    class: classes.addButton,
    text: 'Add',
  };
  const CONNECTION_STATE = {
    sender: null,
    receiver: null,
    connected: false,
    status: null,
  };
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [connectButtonState, setConnectButtonState] = useState(INITIAL_CONNECT_BUTTON_STATE);
  const [connection, setConnection] = useState(CONNECTION_STATE);
  const [userType, setUserType] = useState('sender');

  
  useEffect(() => {
    let mounted = true;
    DEBUG && console.log('followers', followers);
    const checkIfConnectionExists = () => {
      if(mounted && authenticated && followers && user.handle) {
        const senderString = `${authUser}_${user.handle}`;
        const receiverString = `${user.handle}_${authUser}`;
        DEBUG && console.log('senderReceiverString: ', senderString, receiverString);
        let isSender = followers[senderString];
        let isReceiver = followers[receiverString];
        DEBUG && console.log('senderReceiver: ', isSender, isReceiver);
        if(isSender){
          setUserType('sender');
          setConnection({
            sender: isSender.sender,
            receiver: isSender.receiver,
            connected: isSender.connected,
            status: isSender.status,
          });
        } else if(isReceiver) {
          setUserType('receiver');
          setConnection({
            sender: isReceiver.sender,
            receiver: isReceiver.receiver,
            connected: isReceiver.connected,
            status: isReceiver.status,
          });
        } else {
          setConnection({
            sender: null,
            receiver: null,
            connected: false,
            status: 'NotConnected',
          })
        }
      }
    };
    checkIfConnectionExists();
    return () => {
      mounted = false;
    }
  }, [followers, user.handle]);


  const setConnectButton = (buttonClass, buttonText) => {
    setConnectButtonState({
      class: buttonClass,
      text: buttonText,
    });
  };
  

  useEffect(() => {
    DEBUG && console.log('connection: ', connection);
    if (connection !== null) {                  // If connection exists
      if (userType === 'sender') {              // If profile is sender
        if (connection.connected === true) {
          setConnectButton(classes.connectedButton, 'Connected');
        } else {
          setConnectButton(classes.pendingButton, 'Pending');
        }
      } else if(userType === 'receiver') {      // If profile is receiver
        if (connection.connected === true) {
          setConnectButton(classes.connectedButton, 'Connected');
        } else {
          setConnectButton(classes.acceptButton, 'Accept');
        }
      }
    } else {
      setConnectButton(classes.addButton, 'Add');
    };
  }, [connection]);

  
  const handleConnectActions = (event) => {
    if(userType === 'sender') {
      if (connection.status === 'NotConnected') {
        setConnectButton(classes.pendingButton, 'Pending');
        setConnection({ ...connection, status: 'Pending' });
        handleAddConnection();
      } else if (connection.status === 'Pending') {
        setConnectButton(classes.pendingButton, 'Add');
        setConnection({ ...connection, status: 'NotConnected' });
        handleWithdrawRequest();
      }
    } else {
      if(connection.status === 'Pending') {
        setConnectButton(classes.connectedButton, 'Connected');
        setConnection({ ...connection, status: 'Connected' });
        handleAcceptRequest();
      } else if (connection.status === 'Connected') {
        setConnectButton(classes.connectedButton, 'Pending');
        setConnection({ ...connection, status: 'Accept' });
        handleDisconnect();
      }
    }
  };


  const handleAddConnection = () => {
    DEBUG && console.log('Add Connection Post Request');
  };

  const handleWithdrawRequest = () => {
    DEBUG && console.log('Withdraw Connection Delete Request');
  };

  const handleAcceptRequest = () => {
    DEBUG && console.log('Accept Connection Put Request');
  };

  const handleDisconnect = () => {
    DEBUG && console.log('Disconnect Delete Request');
  };


  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  window.onpopstate = () => {
    clearFollower();
  };

  const connectButton = (
    <Button
      className={connectButtonState.class}
      onClick={handleConnectActions}
      color="inherit"
      variant="outlined"
    >
      <PersonAddIcon className={classes.personAddIcon}/>
      {connectButtonState.text}
    </Button>
  );

  return (
    <div
      className={classes.root}
    >
      <div
        className={classes.cover}
        style={{ backgroundImage: `url(${user.coverUrl})` }}
      >
        <Button
          className={classes.changeButton}
          variant="contained"
        >
          <AddPhotoIcon className={classes.addPhotoIcon} />
          Change Cover
        </Button>
      </div>
      <div className={classes.container}>
        <Avatar
          alt="Person"
          className={classes.avatar}
          src={user.imageUrl}
        />
        <div className={classes.details}>
          <Typography
            component="h1"
            variant="h4"
          >
            {user.fullName}
          </Typography>
          <Typography
            component="h2"
          >
            {user.bio}
          </Typography>
        </div>
        <Hidden smDown>
          <div className={classes.actions}>
            <Button
              className={classes.messageButton}
              color="inherit"
              component={RouterLink}
              to="/chat"
              variant="outlined"
            >
              <ChatIcon className={classes.mailIcon}/>
              Message
            </Button>
            {authenticated && user.handle !== authUser && connectButton}
            {/* <Tooltip title="More options">
              <IconButton>
                <MoreIcon />
              </IconButton>
            </Tooltip> */}
          </div>
        </Hidden>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        autoHideDuration={6000}
        message={
          <Typography
            color="inherit"
            variant="h6"
          >
            Sent connection request
          </Typography>
        }
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />
    </div>
  );
};


Header.propTypes = {
  className: PropTypes.string,
  followers: PropTypes.object.isRequired,
  handleFollow: PropTypes.func,
  handleUnfollow:PropTypes.func,
  handleFollowBack: PropTypes.func,
  handleRevokeFollowBack: PropTypes.func,
  clearFollower: PropTypes.func
};


const mapStateToProps = (state) => ({
  followers: state.user.followers,
});

const mapActionsToProps = {
  handleFollow,
  handleUnfollow,
  handleFollowBack,
  handleRevokeFollowBack,
  clearFollower,
};

 export default connect(
  mapStateToProps,
  mapActionsToProps
)(Header);
