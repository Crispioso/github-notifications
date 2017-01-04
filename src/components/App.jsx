import { h, Component } from 'preact';
import NotificationList from './NotificationList.jsx';
import { connect } from 'preact-redux';
import Loader from './Loader.jsx';
import Filters from './Filters.jsx'
import Header from './Header.jsx'

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