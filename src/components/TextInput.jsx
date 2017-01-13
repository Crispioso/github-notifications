import Inferno from 'inferno';
import Component from 'inferno-component';

class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFocused: false
        };

        this.handleFocus = this.handleFocus.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    handleFocus() {
        this.setState({isFocused: true});
    }

    handleInput(event) {
        const thisInput = event.target;
        const id = thisInput.getAttribute('id');
        const value = thisInput.value;
        const onInput = this.props.onInput;
        if (onInput) {
            onInput({id, value});
        }
    }

    render() {
        return (
            <div className={"mdl-textfield mdl-textfield--floating-label" + (this.state.isFocused ? " is-focused" : "")}>
                <input className="mdl-textfield__input" type="text" id={this.props.id} onFocus={this.handleFocus} onInput={this.handleInput}/>
                <label className="mdl-textfield__label" htmlFor={this.props.id}>{this.props.label}</label>
            </div>
        )
    }
}

export default TextInput