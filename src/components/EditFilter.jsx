import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';

class EditFilter extends Component {
    render() {
        return (
            <div className="edit-filters">
                <h2 className="edit-filters__title">Edit {this.props.params.filter}</h2>
                <p className="edit-filters__sub-title">Select a field to add to your filter</p>
            </div>
        )
    }
}

export default connect()(EditFilter);