import { h, Component } from 'preact';
import NotificationList from './NotificationList.jsx';
import { connect } from 'preact-redux';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            dataFetched: props.dataFetched,
            notifications: props.notifications
        }
    }

    componentWillUpdate(nextProps) {
        // Global state has updated, so update impacted component state
        this.setState({
            dataFetched: nextProps.dataFetched,
            notifications: nextProps.notifications
        })
    }

    render() {
        return (
            <div>
                {this.state.dataFetched ?
                    <NotificationList notifications={this.state.notifications}/>
                    : <div class="loader">Loading...</div>
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

export default connect(mapStateToProps)(App);