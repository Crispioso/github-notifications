import Inferno from 'inferno';
import Component from 'inferno-component'
import { connect } from 'inferno-redux'
import { Link } from 'inferno-router';

class CustomFilters extends Component {
    render() {
        return (
            <div>
                <h3 className="drawer__subheading">Custom</h3>
                <nav className="mdl-navigation">
                    <Link to="/filter/cdn-pull-requests"
                          id="cdn-pull-requests"
                          className="mdl-navigation__link filters__link"
                          activeClassName="active">
                        CDN pull requests
                    </Link>
                </nav>
            </div>
        )
    }
}

export default CustomFilters;