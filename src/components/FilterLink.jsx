import Inferno from 'inferno';
import Component from 'inferno-component'
import { Link } from 'inferno-router';

class FilterLink extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const onClick = this.props.onClick;
        const response = {parameters: this.props.parameters, filter: this.props.name}

        if (onClick) {
            onClick(response);
        }
    }

    render() {
        return (
            <Link to={this.props.name} id={"filter-" + this.props.name} data-filter={this.props.name}
               className={"mdl-navigation__link filters__link" + (this.props.active ? " active" : "")} href=""
               onClick={this.handleClick}>
                <i className={"material-icons filters__icon icon icon--" + this.props.icon.class + (this.props.active ? " checked" : "")}>{this.props.icon.type}</i>
                {this.props.text}
            </Link>
        )
    }
}

export default FilterLink