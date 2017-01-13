import Inferno from 'inferno';
import Component from 'inferno-component';
import TextInput from './TextInput.jsx';

class AddFilter extends Component {
    constructor (props) {
        super(props);

        this.state = {
            name: this.props.name || "",
            error: ""
        };

        this.handleNameInput = this.handleNameInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameInput(response) {
        if (this.state.error.length > 0) {
            this.setState({error: ""});
        }

        this.setState({name: response.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        const name = this.state.name;

        if (name.length <= 0) {
            this.setState({error: "Give your new filter a name"});
            return;
        }


    }

    render() {
        return (
            <div className="edit-filters">
                <h2 className="edit-filters__title">Add a new filter</h2>
                <p className="edit-filters__sub-title">Name your new filter</p>
                <form action="#" onSubmit={this.handleSubmit}>
                    <TextInput id="new-filter-name" label="Filter name" onInput={this.handleNameInput} />
                    <p className="edit-filters__error">{this.state.error}</p>
                    <div>
                        <button className="mdl-button mdl-button--raised mdl-button--colored">Save</button>
                    </div>
                </form>
            </div>
        )
    }
}



export default AddFilter;