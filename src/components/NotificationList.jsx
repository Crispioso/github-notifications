import { h, Component } from 'preact';
import NotificationItem from './NotificationItem.jsx';

class NotificationList extends Component {
    constructor(props) {
        super(props)
    }

    buildNotifications() {
        const notifications = this.props.notifications;
        return notifications.map(notification => {
            if (!notification.unread) {
                return;
            }
            
            return <NotificationItem title={notification.title} type={notification.type} repo={notification.repo_full_name} repo-url={notification.repo_url} date={notification.updated_at} />
        });
    }

    render() {
        return (
            <div>
                <p>You have {this.props.notifications.length} notifications</p>
                { this.buildNotifications() }
            </div>
        )
    }
}

export default NotificationList;