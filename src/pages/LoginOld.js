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
import { loginUser, getUserData } from '../redux/actions/user';


const useStyles = makeStyles(AuthTheme);

const Login = (props) => {

  const { history, className, UI: { loading } } = props;
  const classes = useStyles();

  const INITIAL_USER_STATE = { email: '', password: '' };
  const [userData, setuserData] = useState(INITIAL_USER_STATE);
  const [errors, setErrors] = useState({});



  useEffect(() => {
    if(props.UI.errors){
      setErrors(props.UI.errors);
    }
  }, [props.UI.errors]);


  const handleSubmit = (event) => {
    event.preventDefault();
    setuserData({
      email: userData.email,
      password: userData.password
    });
    console.log(userData);
    props.loginUser(userData, history);
  };

  const handleChange = (event) => {
    setuserData({
      ...userData,
      [event.target.name]: event.target.value
    });
    //console.log(userData);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <form noValidate onSubmit={ handleSubmit }>
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
            value={userData.email}
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
            value={userData.password}
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
            Login
          </Button>
          <small >
            Dont have and account ? Signup 
            <Link to="/signup"> here</Link>
          </small>
          <br />
          { loading ? <CircularProgress className={classes.progress} color="secondary" /> : <span></span> }
        </CardActions>
      </form>
    </Card>
  )
};

Login.propTypes = {
  history: PropTypes.object,
  className: PropTypes.string,
  getUserData: PropTypes.func,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};


const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser,
  getUserData
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(Login);
