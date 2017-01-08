import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-redux'

class CustomFilters extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <h3 className="drawer__subheading">Custom</h3>
                <nav className="mdl-navigation">
                    <a data-filter="custom-1" id="cdn-pull-requests" className="mdl-navigation__link" data-param-repo-id="71245455" data-param-type="PullRequest" href="" onClick={this.props.onClick}>CDN pull requests</a>
                </nav>
            </div>
        )
    }
}

export default CustomFilters;