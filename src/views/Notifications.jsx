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
            notifications: props.notifications,
            mainView: props.mainView
        }
    }

    render() {
        return (
            this.props.dataFetched ?
                <NotificationList notifications={this.props.notifications}/>
                :
                <Loader/>
        )
    }
}


function mapStateToProps(state) {
    return {
        dataFetched: state.dataFetched,
        notifications: state.notifications,
        mainView: state.mainView
    }
}

export default connect(mapStateToProps)(Notifications)