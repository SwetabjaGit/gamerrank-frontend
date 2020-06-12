import React, { Suspense, useState } from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';

// Components
import NavBar from '../components/NavBar';
import Topbar from '../components/Topbar';
import ChatBar from '../components/ChatBar';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: '#F4F6F8'
  },
  topBar: {
    zIndex: 2,
    position: 'relative'
  },
  container: {
    width: '100%',
    marginTop: 64,
    margin: '0 auto',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
  navBar: {
    zIndex: 10,
    width: 270,
    minWidth: 270,
    flex: '0 0 auto',
    position: 'fixed',
  },
  content: {
    /* [theme.breakpoints.up('lg')]: {
      marginLeft: 0,
    }, */
    marginLeft: 270,
    overflowY: 'auto',
    flex: '1 1 auto',
    '@media (max-width: 1280px)' : {
      marginLeft: 0,
    }
  },
  chatbox: {
    minWidth: 270,
    width: 270,
    '@media (max-width: 1400px)': {
      minWidth: 0,
      width: 0,
    },
    zIndex: 1,
    backgroundColor: '#002b36',
    height: '100%',
  },
  chatbar: {
    zIndex: 11,
    position: 'fixed',
    height: '100%',
    borderLeft: '1px solid #d2d3d4',
  }
}));


const Dashboard = (props) => {
  const { route } = props;
  console.log(props);
  const classes = useStyles();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <div className={classes.root}>
      <Topbar
        className={classes.topBar}
      />
      <div className={classes.container}  >
        <NavBar
          className={classes.navBar}
          onMobileClose={handleNavBarMobileClose}
          openMobile={openNavBarMobile}
        />
        <div className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {renderRoutes(route.routes)}
          </Suspense>
        </div>
        <Divider orientation="vertical"/>
        <div className={classes.chatbox}>
          <ChatBar className={classes.chatbar}/>
        </div>
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  route: PropTypes.object
};

export default Dashboard;