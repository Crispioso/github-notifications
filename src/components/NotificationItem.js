import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';

class NotificationItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: false,
            read: false,
            delete: false
        }
    }

    convertUTCToString(date) {
        let dateString = new Date(date);
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return weekdays[dateString.getDay()] + " " + dateString.getDate() + " " + months[dateString.getMonth()] + " " + dateString.getFullYear() + " [" + dateString.getHours() + ":" + (dateString.getMinutes().toString().length === 1 ? ("0" + dateString.getMinutes()) : dateString.getMinutes()) + "]";
    }

    render() {
        return (
            <div className="notification">{this.props.title} | {this.props.repoName} | {this.props.type} | {this.convertUTCToString(this.props.date)}</div>
        )
    }
}

function mapStateToProps(state) {
    return {
        selected: state.selected,
        read: state.read,
        delete: state.delete
    }
}

export default connect(mapStateToProps)(NotificationItem);