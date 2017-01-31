import store from '../shared/store';
import { updateNotificationsFetchedBool, updateNotifications, updateUnreadCount } from '../shared/actions';

/**
 * Fetches notifications data from the server
 * @param filter - string of filter name that endpoint recognises (eg favourites)
 */

function fetchNotifications(filter) {

    store.dispatch(updateNotificationsFetchedBool(false));

    fetch('/notifications?filter=' + filter).then(response=> response.json()).then(response => {
        store.dispatch(updateNotifications(response));
        store.dispatch(updateNotificationsFetchedBool(true));
        // store.dispatch(updateUnreadCount(response.totalCount));
    });
}

export default fetchNotifications;

