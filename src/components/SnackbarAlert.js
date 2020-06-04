import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';


const useStyles = makeStyles(theme => ({
  snackbarSuccess: {
    backgroundColor: '#4CAF50'
  },
  snackbarInfo: {
    backgroundColor: '#2196F3'
  },
  snackbarWarning: {
    backgroundColor: '#FB9701'
  },
  snackbarError: {
    backgroundColor: '#F44336'
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: theme.spacing(2)
  }
}));


const SnackbarAlert = props => {
  const { open, onClose, type, message } = props;
  const classes = useStyles();
  let snackbarType = 
    type === 'success' 
    ? classes.snackbarSuccess 
    : type === 'info' 
    ? classes.snackbarInfo 
    : type === 'warning' 
    ? classes.snackbarWarning 
    : classes.snackbarError;

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      autoHideDuration={2000}
      onClose={onClose}
      open={open}
    >
      <SnackbarContent
        className={snackbarType}
        message={
          <span className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
            { message ? message : 'Successfully saved changes!' }
          </span>
        }
        variant="h6"
      />
    </Snackbar>
  );
};

SnackbarAlert.propTypes = {
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired
};

SnackbarAlert.defaultProps = {
  open: true,
  onClose: () => {}
};

export default SnackbarAlert;
