import Inferno from 'inferno';
import Component from 'inferno-component'
import { Link } from 'inferno-router';

class CustomFilterLink extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link
                to={"/filter/" + this.props.slug}
                id={this.props.slug}
                className="mdl-navigation__link filters__link"
                activeClassName="active">
                {this.props.title}
            </Link>
        )
    }
}

export default CustomFilterLink;