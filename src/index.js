// inferno module
import Inferno from 'inferno';
import Component from 'inferno-component'

// scss module
import './scss/main.scss';

// routing modules
import { Router, Route } from 'inferno-router';
import createBrowserHistory from 'history/createBrowserHistory';

// state modules
import { Provider } from 'inferno-redux';
import store from './shared/store';

// utility modules
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

const browserHistory = createBrowserHistory();

class NoMatch extends Component {
    render() {
        return <p>Page not found</p>
    }
}

const routes = (
	<Provider store={ store }>
		<Router history={ browserHistory }>
            <Route component={ Layout }>

                {/*<Route path="/favourites" defaultFilter="favourites" component={ Notifications } />*/}
                {/*<Route path="/done" defaultFilter="done" component={ Notifications } />*/}
                <Route path="/filter" component={ AddFilter } />
                <Route path="/filter/:filter" component={ Notifications } />
                <Route path="/filter/:filter/edit" component={ EditFilter } />
                <Route path="" component={ Notifications } />
                <Route path="/done" component={ Notifications } />
                <Route path="/favourites" component={ Notifications } />
                <Route path="*" component={ NoMatch } />
                {/*<Route path="/filter" filter="filter" component={ AddFilter } />*/}
                {/*<Route path="/filter/:filter" filter="filter/:filter" component={ Notifications } />*/}
                {/*<Route path="/filter/:filter/edit" filter="filter/:filter/edit" component={ EditFilter } />*/}
                {/*<Route path="/favourites" filter="favourites" component={ Notifications } />*/}
                {/*<Route path="/done" filter="done" component={ Notifications } />*/}
                {/*<Route path="" component={ Notifications } />*/}
                {/*<Route path="*" filter="noMatch" component={NoMatch} />*/}
            </Route>
		</Router>
	</Provider>
);

Inferno.render(routes, document.getElementById('app'));

if (module.hot) {
    module.hot.accept()
}

