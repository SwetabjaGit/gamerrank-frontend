import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

//MUI Stuff
import {
  Button,
  Typography,
  TextField,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
} from '@material-ui/core';
import AuthTheme from '../utils/AuthTheme';

// Redux Stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/user';



const useStyles = makeStyles(AuthTheme);

const Signup = (props) => {
  
  const { history, className, UI: { loading } } = props;
  const classes = useStyles();

  const INITIAL_USER_STATE = { email: '', password: '', confirmPassword: '', handle: '' };
  const [newUserData, setnewUserData] = useState(INITIAL_USER_STATE);
  const [errors, setErrors] = useState({});
  


  useEffect(() => {
    if(props.UI.errors){
      setErrors(props.UI.errors)
    }
  }, [props.UI.errors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setnewUserData({
      email: newUserData.email,
      password: newUserData.password,
      confirmPassword: newUserData.confirmPassword,
      handle: newUserData.handle
    });
    console.log(newUserData);
    props.signupUser(newUserData, history);
  };

  const handleChange = (event) => {
    setnewUserData({
      ...newUserData,
      [event.target.name]: event.target.value
    });
    console.log(newUserData);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <form noValidate onSubmit={ handleSubmit }>
        <Typography variant="h2" className={classes.pageTitle}>
          Sign Up
        </Typography>
        <Divider />
        <CardContent className={classes.cardContent}>
          <img src={AppIcon} alt="monkey" className={classes.image} />
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            autoComplete="email"
            margin="normal"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={newUserData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            margin="normal"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={newUserData.password}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            autoComplete="current-password"
            margin="normal"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={newUserData.confirmPassword}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            autoComplete="current-password"
            margin="normal"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={newUserData.handle}
            onChange={handleChange}
            variant="outlined"
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <br />
        </CardContent>
        <Divider />
        <CardActions className={classes.cardActions}>
          <Button
            id="submit-login"
            type="submit"
            className={classes.saveButton}
            variant="contained"
            size="large"
          >
            Signup
          </Button>
          <small >
            Already have an account ? Login
            <Link to="/login"> here</Link>
          </small>
          <br />
          { loading ? <CircularProgress className={classes.progress} color="secondary" /> : <span></span> }
        </CardActions>
      </form>
    </Card>
  )
};

Signup.propTypes = {
  history: PropTypes.object,
  className: PropTypes.string
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  signupUser,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Signup);
