import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { LogInView, UserView } from '../';
import homecontroller from './homecontroller';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      props.isAuthenticated === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

const HomeView = () => {
  const { data } = homecontroller();
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <div>Home Page</div>} />
        <Route path="/login" component={LogInView} />
        <PrivateRoute
          path="/user"
          component={UserView}
          isAuthenticated={data.isAuthenticated}
        />
      </Switch>
    </Router>
  );
};

export default HomeView;
