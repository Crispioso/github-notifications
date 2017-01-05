import { h, Component } from 'preact';
import NotificationItem from './NotificationItem.jsx';

class NotificationList extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const notifications = this.props.notifications;

        return (
            <div>
                {
                    notifications.map(notification => {
                        if (notification.unread) {
                            return <NotificationItem title={notification.title} type={notification.type}
                                                     repoId={notification.repo_id}
                                                     repoName={notification.repo_full_name} url={notification.url}
                                                     date={notification.updated_at}/>
                        }
                    })
                }
            </div>
        )
    }
}

export default NotificationList;