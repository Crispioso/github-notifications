import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import fetchNotifications from '../utilities/fetchNotifications';
import { updateFilter } from '../shared/actions';
import { Link } from 'inferno-router';

import Loader from '../components/Loader.jsx';
import NotificationList from '../components/NotificationList.jsx';
import Layout from '../components/Layout.jsx';

class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataFetched: props.dataFetched,
            notifications: props.notifications,
            filter: props.filter
        };
    }

    componentWillMount() {
        let filter = this.props.filter;

        if (!filter) {
            const splitPath = (this.context.router.location.pathname).split('/');
            filter = splitPath[splitPath.length-1];
            this.props.dispatch(updateFilter(filter));
        }

        fetchNotifications(filter);
    }

    render() {
        return (
            <div>
                {
                    this.props.dataFetched ?
                    <NotificationList notifications={this.props.notifications}/>
                    :
                    <Loader/>
                }
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
        dataFetched: state.dataFetched,
        notifications: state.notifications,
        filter: state.filter
    }
}

export default connect(mapStateToProps)(Notifications)
// export default Notifications