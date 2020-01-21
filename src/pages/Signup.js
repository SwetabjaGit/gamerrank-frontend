import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.png';
import { Link } from 'react-router-dom';
import axios from 'axios';
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


const useStyles = makeStyles(AuthTheme);

const Login = (props) => {
  const { history, className } = props;
  const classes = useStyles();

  const INITIAL_USER_STATE = { email: '', password: '', confirmPassword: '', handle: '' };
  const [newUserData, setnewUserData] = useState(INITIAL_USER_STATE);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  

  const createNewUser = (newData) => {
    axios.post('/signup', newData)
      .then(res => {
         console.log(res.data);  //Store the token in browser localstorage so that we can use it later
         localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
         setLoading(false);
         history.push('/');
      })
      .catch(err => {
        console.log(err);
        setErrors(err.response.data);
        setLoading(false);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    setnewUserData({
      email: newUserData.email,
      password: newUserData.password,
      confirmPassword: newUserData.confirmPassword,
      handle: newUserData.handle
    });
    console.log(newUserData);
    createNewUser(newUserData);
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
            SignUp
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

Login.propTypes = {
  history: PropTypes.object,
  className: PropTypes.string
};

export default Login;
