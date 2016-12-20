import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { toggleChecked } from '../actions';

class Checkbox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: props.checked
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.state.checked = event.target.checked;
        this.props.dispatch(toggleChecked(this.state.checked));
    }

    render() {
        return (
            <div>
                <input type="checkbox" name="checkbox-1" id="checkbox-1" checked={this.state.checked} onChange={this.handleChange} />
                <label htmlFor="checkbox-1">A checkbox</label>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        checked: state.checked
    }
}

export default connect(mapStateToProps)(Checkbox);