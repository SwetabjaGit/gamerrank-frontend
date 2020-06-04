import React from 'react';
import { makeStyles } from '@material-ui/styles';

// Components
import Page from '../../components/Page';
import Header from './Header';
import FAQ from './FAQ';
import PluginsSupport from './PluginsSupport';
import SourceFiles from './SourceFiles';
import UserFlows from './UserFlows';


const useStyles = makeStyles(() => ({
  root: {}
}));


const Welcome = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Welcome"
    >
      <Header/>
      <UserFlows/>
      <PluginsSupport/>
      <SourceFiles/>
      <FAQ/>
    </Page>
  );
};

export default Welcome;