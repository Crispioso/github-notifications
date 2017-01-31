import Inferno from 'inferno';
import Component from 'inferno-component';

class NotificationItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: props.id,
            done: {
                checked: props.done,
                disabled: false
            },
            favourite: {
                checked: props.favourite,
                disabled: false
            }
        };

        this.handleChange = this.handleChange.bind(this);
    }

    convertUTCToString(date) {
        let dateString = new Date(date);
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return weekdays[dateString.getDay()] + " " + dateString.getDate() + " " + months[dateString.getMonth()] + " " + dateString.getFullYear() + " [" + dateString.getHours() + ":" + (dateString.getMinutes().toString().length === 1 ? ("0" + dateString.getMinutes()) : dateString.getMinutes()) + "]";
    }

    handleChange() {
        const action = event.target.dataset.action;
        const data = {};
        const newState = Object.assign({}, this.state);

        data['id'] = this.props.id;
        data[action] = !this.state[action].checked;
        this.props.onChange(data);

        newState[action].value = data[action];
        newState[action].disabled = true;
        this.setState(action);
    }

    render() {
        return (
            <div className="mdl-card demo-card-wide notifications__row">
                <div className="mdl-card__type">
                    <span className="notifications__item">{this.props.type}</span>
                </div>
                <div className="mdl-card__title">
                    <a href={this.props.url} className="mdl-card__title-text notifications__title">{this.props.title}</a>
                </div>
                <div className="mdl-card__supporting-text">
                    <div className="notifications__item">{this.convertUTCToString(this.props.date)}</div>
                    <div className="notifications__item">{this.props.repoName}</div>
                </div>
                <div className="mdl-card__actions">
                    <label htmlFor={"icon-toggle-done-" + this.props.id}>
                        <input data-action="done" data-id={this.props.id} type="checkbox" name={"icon-toggle-done-" + this.props.id} id={"icon-toggle-done-" + this.props.id} className="mdl-icon-toggle__input notifications__input" onChange={this.handleChange} checked={this.state.done.checked} disabled={this.state.done.disabled} />
                        <i className={"icon material-icons notifications__icon icon icon--done" + (this.state.done.checked ? " checked" : "")+ (this.state.done.disabled ? " disabled" : "")}>done</i>
                        <div className="mdl-tooltip" data-mdl-for={"icon-toggle-done-" + this.props.id}>
                            Mark as done
                        </div>
                    </label>

                    <label htmlFor={"icon-toggle-favourite-" + this.props.id}>
                        <input data-action="favourite" data-id={this.props.id} type="checkbox" name={"icon-toggle-favourite-" + this.props.id} id={"icon-toggle-favourite-" + this.props.id} className="mdl-icon-toggle__input notifications__input" onChange={this.handleChange} checked={this.state.favourite.checked} disabled={this.state.favourite.disabled} />
                        <i className={"material-icons notifications__icon icon icon--favourite" + (this.state.favourite.checked ? " checked" : "") + (this.state.favourite.disabled ? " disabled" : "")}>star</i>
                    </label>
                </div>
            </div>
        )
    }
}

export default NotificationItem