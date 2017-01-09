import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { updateFilter } from '../shared/actions';
import NotificationList from './NotificationList.jsx';
import Loader from './Loader.jsx';
import Filters from './Filters.jsx'
import Header from './Header.jsx';

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            dataFetched: props.dataFetched,
            notifications: props.notifications,
            mainView: props.mainView
        }
    }

    render() {
        return (
            <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header">
                <Header/>
                <Filters/>
                <main className="main mdl-layout__content mdl-color--grey-100">
                    <div className="page-content">
                        {this.renderSelector()}
                    </div>
                </main>
            </div>
        )
    }

    renderSelector() {
        switch (this.props.mainView) {
            case ("notifications"): {
                return (
                    this.props.dataFetched ?
                        <NotificationList notifications={this.props.notifications}/>
                        : <Loader/>

                );
            }
            case("addFilter"): {
                return (
                    <p>Add new filter...</p>
                );
            }
            default: {
                debugger;
                break;
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        dataFetched: state.dataFetched,
        notifications: state.notifications,
        mainView: state.mainView
    }
}

export default connect(mapStateToProps)(App);
