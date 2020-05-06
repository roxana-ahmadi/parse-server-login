import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Parse from 'parse';
import './index.css';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
import { HomeView } from './pages';

Parse.initialize('myAppId', 'myMasterKey', 'myMasterKey');
Parse.serverURL = 'http://localhost:1337/parse';

ReactDOM.render(
  <Router>
    <Route path="/" component={HomeView} />
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
