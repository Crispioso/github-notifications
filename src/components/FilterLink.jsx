import Inferno from 'inferno';
import Component from 'inferno-component'
import { Link } from 'inferno-router';

class FilterLink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isActive: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    componentWillMount() {
        this.setState({
            isActive : (this.context.router.location.pathname === ("/" + this.props.name))
        })
    }

    componentWillReceiveProps() {
        this.setState({
            isActive: (this.context.router.location.pathname === ("/" + this.props.name))
        });
    }

    handleClick() {
        const onClick = this.props.onClick;

        if (onClick) {
            onClick(this.props.filter);
        }
    }

    render() {
        return (
            <Link to={"/" + this.props.name}
                  activeClassName="active"
                  className="mdl-navigation__link filters__link"
                  onClick={this.handleClick}>

                <i className={"material-icons filters__icon icon icon--" + this.props.icon.class + (this.state.isActive ? " checked" : "")}>
                    {this.props.icon.type}
                </i>
                {this.props.text}
            </Link>
        )
    }
}

export default FilterLink