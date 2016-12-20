import { h, render } from 'preact';
import { Provider } from 'preact-redux';
import store from './store.js';
import fetchNotifications from './utilities/fetchNotifications'
require('preact/devtools');
require('./scss/main.scss');

function init() {
    fetchNotifications();

    let App = require('./views/App.jsx').default;
    render(
        <Provider store={store}>
            <App />
        </Provider>
        ,
        document.getElementById('app')
    );
}

init();