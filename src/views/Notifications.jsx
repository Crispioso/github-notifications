import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import fetchNotifications from '../utilities/fetchNotifications';
import { updateFilter } from '../shared/actions';

import Loader from '../components/Loader.jsx';
import NotificationList from '../components/NotificationList.jsx';

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
        const splitPath = (this.context.router.location.pathname).split('/');
        let filter = splitPath[splitPath.length-1];

        // At root, so load 'inbox' filter
        if (!filter) {
           filter = 'inbox';
        }

        this.props.dispatch(updateFilter(filter));
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