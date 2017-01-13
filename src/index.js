// inferno module
import Inferno from 'inferno';
import Component from 'inferno-component'

// scss module
import './scss/main.scss';

// routing modules
import { Router, Route, IndexRoute } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// state modules
import { Provider } from 'inferno-redux';
import { updateFilter, updateParameters } from './shared/actions';
import store from './shared/store';

// utility modules
import fetchNotifications from './utilities/fetchNotifications';
import './shared/material-ui';

// app components
import App from './components/App.jsx';
import Notifications from './views/Notifications.jsx';
import AddFilter from './components/AddFilter.jsx';
import EditFilter from './components/EditFilter.jsx';
import CustomFilter from './views/CustomFilter.jsx';

if (module.hot) {
    require('inferno-devtools');
}

// Load default 'inbox' filter
fetchNotifications({done: false});
store.dispatch(updateParameters({done: false}));
store.dispatch(updateFilter('inbox'));

const browserHistory = createBrowserHistory();

class NoMatch extends Component {
    render() {
        return <p>No Match</p>
    }
}

const routes = (
	<Provider store={store}>
		<Router history={ browserHistory }>
            <App>
                <Route path="/" component={ Notifications } />
                <Route path="/:filter" component={ Notifications } />
                <Route path="/custom-filter" component={ AddFilter }>
                    <Route path="/custom-filter/:id" component={ EditFilter }/>
                </Route>
                <Route path="*" component={NoMatch}/>
            </App>
		</Router>
	</Provider>
);

Inferno.render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}

