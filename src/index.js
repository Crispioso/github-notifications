// inferno module
import Inferno from 'inferno';

// scss module
import './scss/main.scss';

// routing modules
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// state modules
import { Provider } from 'inferno-redux';
import store from './shared/store';

// utility modules
import fetchNotifications from './utilities/fetchNotifications';
import './shared/material-ui';

// app components
import NotificationsList from './components/NotificationList';
import App from './components/App';

if (module.hot) {
    require('inferno-devtools');
}

const browserHistory = createBrowserHistory();

const routes = (
	<Provider store={store}>
		<Router history={ browserHistory }>
			<Route path="/" component={ App }/>
		</Router>
	</Provider>
);

fetchNotifications();

Inferno.render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}

