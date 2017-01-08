import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { updateNotifications } from '../shared/actions';
import postNotificationUpdate from '../utilities/postNotificationUpdate';
import NotificationItem from './NotificationItem.jsx';


class NotificationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: this.props.notifications
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
        const id = event.target.dataset.id;
        const action = event.target.dataset.action;
        const checked = !event.target.checked;
        const notificationIndex = this.state.notifications.findIndex(notification => {
            return notification._id === id;
        });
        const dispatch = this.props.dispatch;
        const notifications = this.state.notifications;

        this.state.notifications[notificationIndex][action] = checked;

        postNotificationUpdate(id, action, checked, function() {
            dispatch(updateNotifications(notifications));
        });
    }

    render() {
        const notifications = this.props.notifications;

        return (
            <div className="notifications">
                {
                    notifications.map(notification => {
                        return <NotificationItem title={notification.title} type={notification.type}
                                                 repoId={notification.repo_id}
                                                 repoName={notification.repo_full_name}
                                                 url={notification.url}
                                                 date={notification.updated_at}
                                                id={notification._id}
                                                done={notification.done}
                                                favourite={notification.favourite}
                                                onChange={this.handleOnChange}/>
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        notifications: state.notifications
    }
}

export default connect(mapStateToProps)(NotificationList);

