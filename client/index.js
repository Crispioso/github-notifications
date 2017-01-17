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
import Layout from './components/Layout.jsx';
import Notifications from './views/Notifications.jsx';
import AddFilter from './components/AddFilter.jsx';
import EditFilter from './components/EditFilter.jsx';
import Loader from './components/Loader.jsx';

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
        return <p>Page not found</p>
    }
}

const routes = (
	<Provider store={store}>
		<Router history={ browserHistory }>
            <Route component={ Layout }>
                <Route path="/" component={ Notifications } />
                <Route path="/favourites" component={ Notifications } />
                <Route path="/done" component={ Notifications } />
                <Route path="/filter" component={ AddFilter } />
                <Route path="/filter/:filter" component={ Notifications } />
                <Route path="/filter/:filter/edit" component={ EditFilter } />
                <Route path="*" component={NoMatch} />
            </Route>
		</Router>
	</Provider>
);



Inferno.render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}

