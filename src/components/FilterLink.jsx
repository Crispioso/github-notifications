import Inferno from 'inferno';
import Component from 'inferno-component'
import { Link } from 'inferno-router';

class FilterLink extends Component {
    constructor(props) {
        super(props);

        this.addDynamicParameters = this.addDynamicParameters.bind(this);
    }

    addDynamicParameters(domNode) {
        const parameters = this.props.parameters;
        Object.keys(parameters).map(key => {
            domNode.setAttribute('data-param-' + key, parameters[key]);
        });
    }

    componentDidMount() {
        // const domNode = document.getElementById('filter-' + this.props.name);
        // this.addDynamicParameters(domNode);
    }

    render() {
        return (
            <Link to={this.props.name} id={"filter-" + this.props.name} data-filter={this.props.name}
               className={"mdl-navigation__link filters__link" + (this.props.active ? " active" : "")} href=""
               onClick={this.props.onClick}>
                <i className={"material-icons filters__icon icon icon--" + this.props.icon.class + (this.props.active ? " checked" : "")}>{this.props.icon.type}</i>
                {this.props.text}
            </Link>
        )
    }
}

export default FilterLink