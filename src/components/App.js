import Inferno from 'inferno';
import Component from 'inferno-component';
import NotificationList from './NotificationList';
import { connect } from 'inferno-redux';
import Loader from './Loader';
import Filters from './Filters'
import Header from './Header';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            dataFetched: props.dataFetched,
            notifications: props.notifications
        }
    }

    componentWillReceiveProps(nextProps) {
        // Global state has updated, so update impacted component state
        this.setState({
            dataFetched: nextProps.dataFetched,
            notifications: nextProps.notifications
        })
    }

    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <Header/>
                <Filters/>
                <main className="main mdl-layout__content mdl-color--grey-100">
                    <div className="page-content">
                        {this.state.dataFetched ?
                            <NotificationList notifications={this.state.notifications}/>
                            : <Loader/>
                        }
                    </div>
                </main>
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
