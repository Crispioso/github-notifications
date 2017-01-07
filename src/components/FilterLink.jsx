import Inferno from 'inferno';
import Component from 'inferno-component'

class FilterLink extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <a data-filter={this.props.name} className={"mdl-navigation__link filters__link" + (this.props.active ? " active" : "")} href="" onClick={this.props.onClick}>
                <i className="material-icons filters__icon">{this.props.icon}</i>
                {this.props.text}
            </a>
        )
    }
}

export default FilterLink