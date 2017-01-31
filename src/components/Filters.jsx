import Inferno from 'inferno';
import Component from 'inferno-component'
import { Link } from 'inferno-router';

import FilterLink from './FilterLink.jsx';
import CustomFilters from './CustomFilters.jsx';

class Filters extends Component {

    render() {
        return (
            <div className="mdl-layout__drawer filters">
                <h2 className="mdl-layout-title">Filters</h2>
                <nav className="mdl-navigation">
                    <FilterLink filter="inbox" name="" text="Inbox" icon={{type: 'home', class: 'home'}}/>
                    <FilterLink filter="favourites" name="favourites" text="Favourites" icon={{type: 'star', class: 'favourite'}}/>
                    <FilterLink filter="done" name="done" text="Done" icon={{type: 'done', class: 'done'}}/>
                </nav>
                <CustomFilters/>
                <Link to="/filter" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                    <i id="add-filter" className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

export default Filters