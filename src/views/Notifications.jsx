import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';

import Loader from '../components/Loader.jsx';
import NotificationList from '../components/NotificationList.jsx';

class Notifications extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataFetched: props.dataFetched,
            notifications: props.notifications
        }
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
        notifications: state.notifications
    }
}

export default connect(mapStateToProps)(Notifications)