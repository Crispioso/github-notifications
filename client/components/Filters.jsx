import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import { Link } from 'inferno-router';
import fetchNotifications from '../utilities/fetchNotifications';
import { updateFilter, updateParameters, updateMainView } from '../shared/actions';
import FilterLink from './FilterLink.jsx';
import CustomFilters from './CustomFilters.jsx';

class Filters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: ''
        };

        this.handleNavClick = this.handleNavClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        fetchNotifications(nextProps.parameters);
    }

    handleNavClick(options) {
        const dispatch = this.props.dispatch;

        dispatch(updateParameters(options.parameters));
        dispatch(updateFilter(options.filter));
    }

    render() {
        return (
            <div className="mdl-layout__drawer filters">
                <h2 className="mdl-layout-title">Filters</h2>
                <nav className="mdl-navigation">
                    <FilterLink parameters={{done: false}} name="" text="Inbox" icon={{type: 'home', class: 'home'}} onClick={this.handleNavClick} active={this.props.filter === ""}/>
                    <FilterLink parameters={{favourite: true, done: false}} name="favourites" text="Favourites" icon={{type: 'star', class: 'favourite'}} onClick={this.handleNavClick} active={this.props.filter === "favourites"}/>
                    <FilterLink parameters={{done: true}} name="done" text="Done" icon={{type: 'done', class: 'done'}} onClick={this.handleNavClick} active={this.props.filter === "done"}/>
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
        filter: state.filter,
        parameters: state.parameters
    }
}

export default connect(mapStateToProps)(Filters)