import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Parse from 'parse';
import { Record } from 'immutable';
import { withState, pipe, withHandlers } from '../../js';

function findWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    findWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(findWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

const getWindowDimensions = () => () => {
  const { height, width } = useWindowDimensions();
  return { height, width };
};

const PrivateRoute = () => ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Parse.User.current() ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const onLogOut = ({ setData }) => () => {
  console.log('logout');
  Parse.User.logOut().then(() => {
    console.log('logout 2');
    setData(d => d.set('authenticated', false));
  });
};

const init = () =>
  Record({
    authenticated: Parse.User.current(),
  });

const homeController = pipe(
  withState(init, 'data', 'setData'),
  withHandlers({
    getWindowDimensions,
    PrivateRoute,
    onLogOut,
  }),
);

export default homeController;
