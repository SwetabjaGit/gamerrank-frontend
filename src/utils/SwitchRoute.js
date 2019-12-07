import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const SwitchRoute = (props) => {

  const {
    component1: Component1,
    component2: Component2,
    authenticated,
    ...rest
  } = props;
  const renderComponent = (props) => authenticated === true ? <Component1 {...props} /> : <Component2 {...props} />;

  return (
    <Route
      {...rest}
      render={renderComponent}
    />
  );

};

export default SwitchRoute;
