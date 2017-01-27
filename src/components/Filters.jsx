import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import { Link } from 'inferno-router';
import { updateFilter } from '../shared/actions';
import fetchNotifications from '../utilities/fetchNotifications';

import FilterLink from './FilterLink.jsx';
import CustomFilters from './CustomFilters.jsx';

class Filters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: props.filter
        }
    }

    render() {
        return (
            <div className="mdl-layout__drawer filters">
                <h2 className="mdl-layout-title">Filters</h2>
                <nav className="mdl-navigation">
                    <FilterLink filter="inbox" name="" text="Inbox" icon={{type: 'home', class: 'home'}} onClick={this.handleNavClick}/>
                    <FilterLink filter="favourites" name="favourites" text="Favourites" icon={{type: 'star', class: 'favourite'}} onClick={this.handleNavClick}/>
                    <FilterLink filter="done" name="done" text="Done" icon={{type: 'done', class: 'done'}} onClick={this.handleNavClick}/>
                </nav>
                <CustomFilters onClick={this.handleNavClick}/>
                <Link to="/filter" className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                    <i id="add-filter" className="material-icons">add</i>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        filter: state.filter
    }
}

export default connect(mapStateToProps)(Filters)