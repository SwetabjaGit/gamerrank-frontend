import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import _ from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Divider,
  Input,
  List,
  Snackbar,
  Typography,
  colors
} from '@material-ui/core';

// Icons
import SearchIcon from '@material-ui/icons/Search';

// Components
import Paginate from "../../components/Paginate";
import { profile } from '../../config/constants';
import Connection from './connection';


const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    paddingTop: 0,
    margin: theme.spacing(0, 3),
  },
  search: {
    width: '100%',
    padding: theme.spacing(2, 3),
    display: 'flex',
    alignItems: 'center'
  },
  searchIcon: {
    color: theme.palette.text.secondary
  },
  searchInput: {
    width: '100%',
    marginLeft: theme.spacing(1),
    color: theme.palette.text.secondary,
    fontSize: '14px'
  },
  connectButton: {
    marginLeft: 'auto'
  },
  pendingButton: {
    marginLeft: 'auto',
    color: theme.palette.white,
    backgroundColor: colors.red[600],
    '&:hover': {
      backgroundColor: colors.red[900]
    }
  },
  connectedButton: {
    marginLeft: 'auto',
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  paginateBox: {
    width: '100%',
    alignContent: 'center',
    margin: 15
  }
}));


const Connections = props => {
  const { connections, className } = props;
  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = profile.CONNECTIONS_PAGE_SIZE;

  /* useEffect(() => {
    let mounted = true;
    fetchConnections();
    return () => {
      mounted = false;
    };
  }, []); */

  const handleConnectToggle = id => {
    const newConnections = _.map(connections, _.clone);
    return newConnections.map(connection => {
      if (connection.id === id) {
        connection.status =
          connection.status === 'connected' || connection.status === 'pending'
            ? 'not_connected'
            : 'pending';

        if (connection.status === 'pending') {
          setOpenSnackbar(true);
        }
      }
      return connection;
    });
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const connectionsList = connections ? (
    connections.map((connection, i) => (
      <Connection
        key={i}
        index={i}
        connection={connection}
        length={connections.length}
        handleConnectToggle={handleConnectToggle}
      />
    )) 
  ) : [];

  let pagesCount = connections
    ? (connections.length > 0 
        ? Math.ceil(connections.length / itemsPerPage) : 1
    ) : 1;

  const paginatedList = 
    connectionsList.length > 0
      ? connectionsList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
      ) : (
        <Typography variant="h3">
          You are not Connected to anyone
        </Typography>
      );

  return (
    <div className={clsx(classes.root, className)} >
      <div className={classes.search}>
        <SearchIcon
          className={classes.searchIcon}
          color="inherit"
        />
        <Input
          className={classes.searchInput}
          color="primary"
          disableUnderline
          placeholder="Search people &amp; places"
        />
      </div>
      <Divider />
      <div className={classes.content}>
        <PerfectScrollbar>
          <List disablePadding>
            {paginatedList}
          </List>
        </PerfectScrollbar>
      </div>
      <div className={classes.paginateBox}>
        <Paginate
          itemsPerPage={itemsPerPage}
          pagesCount={pagesCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
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

Connections.propTypes = {
  className: PropTypes.string
};

export default Connections;
