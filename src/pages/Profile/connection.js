import React from "react";
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

// Icons
import CheckIcon from '@material-ui/icons/Check';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


const useStyles = makeStyles(theme => ({
  avatar: {
    height: 50,
    width: 50
  },
  listItem: {
    flexWrap: 'wrap'
  },
  listItemText: {
    marginLeft: theme.spacing(1)
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));


const Connection = (props) => {
  const { connection, length, index, handleConnectToggle } = props;
  const classes = useStyles();
  

  return (
    <ListItem
      className={classes.listItem}
      disableGutters
      divider={index < length - 1}
      key={connection.id}
    >
      <ListItemAvatar>
        <Avatar
          alt="Profile image"
          className={classes.avatar}
          component={RouterLink}
          src={connection.avatar}
          to="/profile/1/timeline"
        />
      </ListItemAvatar>
      <ListItemText
        className={classes.listItemText}
        primary={connection.name}
        secondary={`${connection.common} connections in common`}
      />
      {connection.status === "not_connected" && (
        <Button
          color="default"
          //onClick={() => handleConnectToggle(connection.id)}
          size="small"
          variant="outlined"
        >
          <PersonAddIcon className={classes.buttonIcon} />
          Connect
        </Button>
      )}
      {connection.status === "pending" && (
        <Button
          color="secondary"
          onClick={() => handleConnectToggle(connection.id)}
          size="small"
          variant="outlined"
        >
          <PersonAddIcon className={classes.buttonIcon} />
          Pending
        </Button>
      )}
      {connection.status === "connected" && (
        <Button
          color="primary"
          //onClick={() => handleConnectToggle(connection.id)}
          size="small"
          variant="outlined"
        >
          <CheckIcon className={classes.buttonIcon} />
          Connected
        </Button>
      )}
    </ListItem>
  );
};

export default Connection;
