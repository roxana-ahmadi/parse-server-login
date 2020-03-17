import React from 'react';
import ReactDOM from 'react-dom';
import Parse from 'parse';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';

Parse.initialize('myAppId', 'myMasterKey', 'myMasterKey');
Parse.serverURL = 'http://localhost:1337/parse';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
