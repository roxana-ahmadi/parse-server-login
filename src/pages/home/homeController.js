import { useState, useEffect } from 'react';
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

const onLogOut = () => history => {
  Parse.User.logOut().then(() => {
    history.push('/');
  });
};

const init = () => Record({});

const homeController = pipe(
  withState(init, 'data', 'setData'),
  withHandlers({
    getWindowDimensions,
    onLogOut,
  }),
);

export default homeController;
