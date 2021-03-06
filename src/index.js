import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ErrorScreen from './ErrorScreen';
import * as serviceWorker from './serviceWorker';

window.gm_authFailure = () => {
    ReactDOM.render(<ErrorScreen />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.register();
