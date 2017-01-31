import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { updateNotifications, updateUnreadCount } from '../shared/actions';
import putNotification from '../utilities/putNotification';
import NotificationItem from './NotificationItem.jsx';


class NotificationList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notifications: props.notifications
        };

        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(item) {
        putNotification(item).then((updatedNotifications) => {
            this.props.dispatch(updateNotifications(updatedNotifications));
        }).catch(err => {
            console.log("Error updating notification \n%s", err);
        });
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({
        //     notifications: nextProps.notifications
        // })
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
                                                 url={notification.web_url}
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

