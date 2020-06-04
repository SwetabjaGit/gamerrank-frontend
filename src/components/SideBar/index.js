import React, {useState} from 'react';
import { Link } from 'react-router-dom'

// Components
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';

// Icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

// Import Routes to render
import routes from './sidebarConfig';


const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    overflowY: 'auto',
    marginTop: theme.spacing(7),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    position: 'sticky',
    zIndex: 5
  },
  content: {
    margin: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


const SideBar = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const renderItems = () => {
    return routes.map((route, i) => {
      if(route.sidebarItem === true) {
        if(route.children) {
          return (
            <div key={i}>
              <ListItem button onClick={handleClick}>
                <ListItemIcon>
                  <route.icon />
                </ListItemIcon>
                <ListItemText primary={route.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {route.children.map((child, j) => {
                    return (
                      <Link to={child.path} key={'c_' + j}>
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <child.icon />
                          </ListItemIcon>
                          <ListItemText primary={child.name} />
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          )
        } else {
          return (
            <div key={i}>
              <Link to={route.path}>
                <ListItem button>
                  <ListItemIcon>
                    <route.icon />
                  </ListItemIcon>
                  <ListItemText primary={route.name}/>
                </ListItem>
              </Link>
              <Divider/>
            </div>
          )
        }
      } else {
        return null;
      }
    });
  };

  return (  
    <div className={classes.root}>
      <Card className={classes.content}>
        <List component="nav" aria-label="main mailbox folders">
          {renderItems()}
        </List>
      </Card>
    </div>
  );
}
 
export default SideBar;