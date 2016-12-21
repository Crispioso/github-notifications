import { h, Component } from 'preact';
import { connect } from 'preact-redux';

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
        const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return weekdays[dateString.getDay()] + " " + dateString.getDate() + " " + months[dateString.getMonth()] + " " + dateString.getFullYear() + " [" + dateString.getHours() + ":" + dateString.getMinutes() + "]";
    }

    render() {
        return (
            <div className="notification">{this.props.title} | {this.props.owner} | {this.props.repo} | {this.props.type} | {this.convertUTCToString(this.props.date)}</div>
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