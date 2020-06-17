import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';
import WorkIcon from '@material-ui/icons/Work';
import AddIcon from '@material-ui/icons/Add';
import PlaceIcon from '@material-ui/icons/Place';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import InstagramIcon from '@material-ui/icons/Instagram';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  cardHeader: {
    marginLeft: theme.spacing(2),
    padding: theme.spacing(2)
  },
  content: {
    paddingTop: 0,
    marginBottom: theme.spacing(-3),
  },
  listItem: {
    padding: theme.spacing(1.1, 1),
  },
  divider: {
    margin: theme.spacing(0, 1),
  }
}));


const About = props => {
  const {
    followerCount, followingCount,
    bio, email,
    website, location
  } = props.userInfo;
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
    >
      <CardHeader
        className={classes.cardHeader}
        variant="h6" 
        title="About"
      />
      <Divider />
      <CardContent className={classes.content}>
        <Grid container spacing={1} >
          <Grid item md={6} sm={6} xs={12}>
            <List>
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={bio}
                  secondary="Jan 9, 2014"
                />
              </ListItem>
              <Divider className={classes.divider} />
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar>
                    <AddIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Add a School"
                  secondary="Example: Delhi public school"
                />
              </ListItem>
              <Divider className={classes.divider} />
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar>
                    <PlaceIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={`Lives in ${location}`} 
                  secondary="Originally from London, United Kingdom" 
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <List>
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar>
                    <FavoriteIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={`Followers: ${followerCount}`} 
                  secondary={`Following: ${followingCount}`} 
                />
              </ListItem>
              <Divider className={classes.divider} />
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar>
                    <PhoneAndroidIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Work Email" 
                  secondary={email} 
                />
              </ListItem>
              <Divider className={classes.divider} />
              <ListItem className={classes.listItem}>
                <ListItemAvatar>
                  <Avatar>
                    <InstagramIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Personal Website" 
                  secondary={website} 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

About.propTypes = {
  className: PropTypes.string
};

export default About;
