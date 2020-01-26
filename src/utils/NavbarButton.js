import React from 'react';

import Tooltip from '@material-ui/core/Tooltip';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton'; 
import { Link } from 'react-router-dom';


const NavbarButton = (props) => {

  const { badge, tip, link, children, onClick, btnClassName, badgeClassName, badgeCount, refr } = props;

  return badge === true ? (
    <Tooltip
      key={tip}
      title={tip} 
      placement="bottom"
      aria-label="add"
    >
      <Link to={link}>
        <IconButton
          key={tip}
          className={btnClassName}
          color="inherit"
          onClick={onClick}
          ref={refr}
        >
          <Badge
            badgeContent={badgeCount}
            className={badgeClassName}
          >
            { children }
          </Badge>
        </IconButton>
      </Link>
    </Tooltip>
  ) : (
    <Tooltip
      key={tip}
      title={tip} 
      placement="bottom"
      aria-label="add"
    >
      <Link to={link}>
        <IconButton
          key={tip}
          className={btnClassName}
          color="inherit"
          onClick={onClick}
        >
          { children }
        </IconButton>
      </Link>
    </Tooltip>
  );

};

export default NavbarButton;
