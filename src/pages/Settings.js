import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Button,
  CardContent,
  CardActions,
  Divider,
  TextField,
  colors,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.breakpoints.values.md,
    margin: '0 auto',
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center'
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30
  },
  textFields: {
    margin: 10
  },
  cardActions: {
    display: 'flex'
  },
  flexGrow: {
    flexGrow: 1
  },
  saveButton: {
    color: '#fff',
    margin: 10,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  keywords: {
    padding: 15,
    display: 'flex',
    alignItems: 'center'
  },
  chips: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 5
  },
  pageTitle: {
    margin: '20px auto 20px auto'
  },
  selects: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: colors.grey[50],
    padding: 10
  },
  inNetwork: {
    marginLeft: 'auto'
  }
}));

const Settings = props => {

  const { className, staticContext, ...rest } = props;
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
        <Typography variant="h2" className={classes.pageTitle}>
          Your Settings
        </Typography>
        <Divider />
        <Divider />
        <CardContent className={classes.cardContent}>
          <TextField
            className={classes.textFields}
            label="Image URL"
            placeholder="Link to Profile URL"
            name="title"
            required
            variant="outlined"
          />
          <TextField
            className={classes.textFields}
            label="Name of the user"
            placeholder="Name of the user"
            name="about"
            required
            variant="outlined"
          />
          <TextField
            className={classes.textFields}
            label="User Description"
            rows="8"
            placeholder="User Description"
            name="content"
            multiline
            required
            variant="outlined"
          />
          <TextField
            className={classes.textFields}
            label="User Email"
            placeholder="Email of the user"
            name="title"
            required
            variant="outlined"
          />
          <TextField
            className={classes.textFields}
            label="User Password"
            placeholder="Password of the user"
            name="title"
            required
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Divider />
        <CardActions className={classes.cardActions}>
          <div className={classes.flexGrow} />
          <Button
            className={classes.saveButton}
            variant="contained"
            size="large"
          >
            Update Settings
         </Button>
        </CardActions>
    </Card>
  )
};

export default Settings;
