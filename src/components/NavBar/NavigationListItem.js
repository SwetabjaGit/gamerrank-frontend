/* eslint-disable react/display-name */
import React, { useState, forwardRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
//import { colors } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';


const CustomRouterLink = forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{ flexGrow: 1 }}
  >
    <RouterLink {...props} />
  </div>
));


const useStyles = makeStyles(theme => ({
  item: {
    //border: '1px solid black',
    display: 'block',
    height: '100%',
    width: '100%',
    padding: theme.spacing(1.6, 0),
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: "#fff",
      color: "#000"
    },
    '&:hover $icon': {
      color: "#000"
    },
    '&:hover $label': {
      color: "#000"
    },
  },
  itemLeaf: {
    //border: '1px solid black',
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: theme.spacing(1.6, 0),
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: "#adadad",
      color: "#fff"
    },
    '&:hover $icon': {
      color: "#fff"
    },
    '&:hover $label': {
      color: "#fff"
    },
  },
  icon: {
    color: theme.palette.icon,
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0, 2.5),
  },
  expandIcon: {
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
  },
  label: {
    alignItems: 'center',
    //marginLeft: 'auto',
    fontWeight: 'bold',
    fontSize: '1em'
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const NavigationListItem = props => {
  const {
    title,
    href,
    depth,
    children,
    icon: Icon,
    className,
    open: openProp,
    label: Label,
    selectedIndex,
    setSelectedIndex,
    ...rest
  } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(openProp);

  const handleToggle = () => {
    setOpen(open => !open);
    //setSelectedIndex(title);
  };

  let paddingLeft = 0;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  const style = {
    paddingLeft
  };

  if (children) {
    return (
      <ListItem
        {...rest}
        className={clsx(classes.item, className)}
        disableGutters
        button
        onClick={handleToggle}
        style={style}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <ListItemIcon>
            {Icon && <Icon className={classes.icon} />}
          </ListItemIcon>
          <Typography className={classes.label}>
            {title}
          </Typography>
          {open ? 
            <ExpandLessIcon
              className={classes.expandIcon}
              color="inherit"
            /> : 
            <ExpandMoreIcon
              className={classes.expandIcon}
              color="inherit"
            />
          }
        </div>
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  } else {
    return (
      <ListItem
        {...rest}
        className={clsx(classes.itemLeaf, className)}
        disableGutters
        button
        onClick={() => setSelectedIndex(title)}
        selected={selectedIndex === title}
        component={CustomRouterLink}
        exact
        to={href}
        style={style}
      >
        <ListItemIcon>
          {Icon && <Icon className={classes.icon} />}
        </ListItemIcon>
        <Typography className={classes.label}>
          {title}
        </Typography>
        {Label && (
          <span className={classes.label}>
            <Label />
          </span>
        )}
      </ListItem>
    );
  }
};

NavigationListItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  depth: PropTypes.number.isRequired,
  href: PropTypes.string,
  icon: PropTypes.any,
  label: PropTypes.any,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired
};

NavigationListItem.defaultProps = {
  depth: 0,
  open: false
};

export default NavigationListItem;
