import store from '../store';
import { updateFetchedBool, addNotifications, updateUnreadCount } from '../actions';

function fetchNotifications() {
    fetch('/notificationsData').then(response=> response.json()).then(response => {
        store.dispatch(addNotifications(response.notifications));
        store.dispatch(updateFetchedBool(true));
        store.dispatch(updateUnreadCount(response.metadata.unreadCount));
    });
}

export default fetchNotifications;

