import { h, Component } from 'preact';
import fetchNotifications from '../utilities/fetchNotifications';

class Filters extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeLink: "all"
        };

        this.handleNavClick = this.handleNavClick.bind(this);
    }

    handleNavClick(event) {
        event.preventDefault();
        console.log();

        const linkId = event.target.getAttribute('id');
        const parameters = {};

        parameters.repoID = event.target.getAttribute('data-repoID');
        parameters.type = event.target.getAttribute('data-type');

        fetchNotifications(parameters);
        this.setState({activeLink: linkId})
    }

    render() {
        return (
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Filters</span>
                <nav className="mdl-navigation">
                    <a id="all" className="mdl-navigation__link" href="" onClick={this.handleNavClick}>All</a>
                    <a id="cdn-pull-requests" className="mdl-navigation__link" data-repoID="71245455" data-type="PullRequest" href="" onClick={this.handleNavClick}>CDN pull requests</a>
                </nav>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                    <i className="material-icons">add</i>
                </button>
            </div>
        )
    }
}

export default Filters