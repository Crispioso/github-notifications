import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { updateNotifications } from '../shared/actions';

class NotificationItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            done: this.props.done,
            favourite: this.props.favourite
        };

        this.handleChange = this.handleChange.bind(this);
        // this.handleDoneChange = this.handleDoneChange.bind(this);
        // this.handleFavouriteChange = this.handleFavouriteChange.bind(this);
    }

    convertUTCToString(date) {
        let dateString = new Date(date);
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return weekdays[dateString.getDay()] + " " + dateString.getDate() + " " + months[dateString.getMonth()] + " " + dateString.getFullYear() + " [" + dateString.getHours() + ":" + (dateString.getMinutes().toString().length === 1 ? ("0" + dateString.getMinutes()) : dateString.getMinutes()) + "]";
    }

    // handleDoneChange(event) {
    //     const checked = !event.target.checked;
    //     this.setState({done: checked});
    //     this.props.onChange(event);
    // }
    //
    // handleFavouriteChange(event) {
    //     const checked = !event.target.checked;
    //     this.setState({favourite: checked});
    //     this.props.onChange(event);
    // }

    handleChange(event) {
        const action = event.target.dataset.action;
        const checked = !event.target.checked;
        const newState = {};
        newState[action] = checked;
        this.setState(newState);
        this.props.onChange(event)
    }

    render() {
        return (
            <div className="mdl-card demo-card-wide notifications__row">
                <div className="mdl-card__type">
                    <span className="notifications__item">{this.props.type}</span>
                </div>
                <div className="mdl-card__title">
                    <span className="mdl-card__title-text notifications__item">{this.props.title}</span>
                </div>
                <div className="mdl-card__supporting-text">
                    <div className="notifications__item">{this.convertUTCToString(this.props.date)}</div>
                    <div className="notifications__item">{this.props.repoName}</div>
                </div>
                <div className="mdl-card__actions">
                    <label className="mdl-icon-toggle mdl-js-icon-toggle mdl-js-ripple-effect" htmlFor={"icon-toggle-done-" + this.props.id}>
                        <input data-action="done" data-id={this.props.id} type="checkbox" id={"icon-toggle-done-" + this.props.id} className="mdl-icon-toggle__input" onChange={this.handleChange} checked={this.state.done} />
                        <i className="mdl-icon-toggle__label material-icons filters__icon">done</i>
                    </label>
                    <label className="mdl-icon-toggle mdl-js-icon-toggle mdl-js-ripple-effect" htmlFor={"icon-toggle-favorite-" + this.props.id}>
                        <input data-action="favourite" data-id={this.props.id} type="checkbox" id={"icon-toggle-favorite-" + this.props.id} className="mdl-icon-toggle__input" onChange={this.handleChange} checked={this.state.favourite} />
                        <i className="mdl-icon-toggle__label material-icons filters__icon">favorite</i>
                    </label>
                </div>
            </div>
        )
    }
}

// function mapStateToProps(state) {
//     return {
//         done: state.done,
//         favourite: state.favourite
//     }
// }
//
// export default connect(mapStateToProps)(NotificationItem);
export default NotificationItem