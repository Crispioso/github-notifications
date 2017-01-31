import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-redux';
import fetchCustomFilters from '../utilities/fetchCustomFilters';

import CustomFilterLink from './CustomFilterLink.jsx';
import Loader from './Loader.jsx';

class CustomFilters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            customFilters: props.customFilters,
            filtersFetched: props.filtersFetched
        }
    }

    componentWillMount() {
        fetchCustomFilters();
    }

    shouldComponentUpdate() {
        console.log(this.context.router.location.pathname);
    }

    renderFiltersList() {
        return (
            this.props.customFilters.map(filter => {
                return <CustomFilterLink {...filter}/>
            })
        )
    }

    render() {
        return (
            <div>
                <h3 className="drawer__subheading">Custom</h3>
                <nav className="mdl-navigation">
                    {
                        this.props.filtersFetched ?
                            this.renderFiltersList()
                            :
                            <Loader/>
                    }
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        customFilters: state.customFilters,
        filtersFetched: state.filtersFetched
    }
}

export default connect(mapStateToProps)(CustomFilters);