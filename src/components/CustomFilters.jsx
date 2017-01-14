import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import { Link } from 'inferno-router';

class CustomFilters extends Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const onClick = this.props.onClick;
        const response = {
            parameters: {
                repoId: `71245455`,
                type: `PullRequest`
            },
            filter: this.props.name
        };

        if (onClick) {
            onClick(response);
        }
    }

    render() {
        return (
            <div>
                <h3 className="drawer__subheading">Custom</h3>
                <nav className="mdl-navigation">
                    <Link to="cdn-pull-requests" data-filter="custom-1" id="cdn-pull-requests" className="mdl-navigation__link" data-param-repo-id="71245455" data-param-type="PullRequest" href="" onClick={this.props.onClick}>CDN pull requests</Link>
                </nav>
            </div>
        )
    }
}

export default CustomFilters;