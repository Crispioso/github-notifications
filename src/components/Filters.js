import Inferno from 'inferno';
import Component from 'inferno-component'
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

        const attributes = event.target.attributes;
        const linkId = attributes.id;
        let parameters = {};

        Array.prototype.slice.call(attributes).forEach(attribute => {
            const isParameterAttribute = attribute.name.substring(0, 10) === "data-param";
            if (!isParameterAttribute) {
                return;
            }

            const parameterTitle = attribute.name.substring(11, (attribute.name.length));
            parameters[parameterTitle] = attribute.value;
        });

        fetchNotifications(parameters);
        this.setState({activeLink: linkId})
    }

    render() {
        return (
            <div className="mdl-layout__drawer">
                <span className="mdl-layout-title">Filters</span>
                <nav className="mdl-navigation">
                    <a id="all" className="mdl-navigation__link" href="" onClick={this.handleNavClick}>All</a>
                    <a id="cdn-pull-requests" className="mdl-navigation__link" data-param-repo-id="71245455" data-param-type="PullRequest" href="" onClick={this.handleNavClick}>CDN pull requests</a>
                </nav>
                <button className="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab">
                    <i className="material-icons">add</i>
                </button>
            </div>
        )
    }
}

export default Filters