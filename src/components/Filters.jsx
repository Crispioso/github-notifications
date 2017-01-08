import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import fetchNotifications from '../utilities/fetchNotifications';
import { updateFilter, updateParameters } from '../shared/actions';
import FilterLink from './FilterLink.jsx';
import CustomFilters from './CustomFilters.jsx';

class Filters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: this.props.filter
        };

        this.handleNavClick = this.handleNavClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        fetchNotifications(nextProps.parameters);
    }

    handleNavClick(event) {
        event.preventDefault();

        const filter = event.target.dataset.filter;
        const dispatch = this.props.dispatch;
        const attributes = event.target.attributes;

        // Build up parameters
        let parameters = {};

        Array.prototype.slice.call(attributes).forEach(attribute => {
            const isParameterAttribute = attribute.name.substring(0, 10) === "data-param";
            if (!isParameterAttribute) {
                return;
            }

            const parameterTitle = attribute.name.substring(11, (attribute.name.length));
            parameters[parameterTitle] = attribute.value;
        });

        dispatch(updateParameters(parameters));
        dispatch(updateFilter(filter));
    }

    render() {
        return (
            <div className="mdl-layout__drawer filters">
                <h2 className="mdl-layout-title">Filters</h2>
                <nav className="mdl-navigation">
                    <FilterLink parameters={{}} name="all" text="All" icon="home" onClick={this.handleNavClick} active={this.props.filter === "all"}/>
                    <FilterLink parameters={{favourite: true}} name="favourites" text="Favourites" icon="favorite" onClick={this.handleNavClick} active={this.props.filter === "favourites"}/>
                    <FilterLink parameters={{done: true}} name="done" text="Done" icon="done" onClick={this.handleNavClick} active={this.props.filter === "done"}/>
                    <FilterLink parameters={{unread: false}} name="read" text="Read" icon="drafts" onClick={this.handleNavClick} active={this.props.filter === "read"}/>
                </nav>
                <CustomFilters onClick={this.handleNavClick}/>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                    <i className="material-icons">add</i>
                </button>
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