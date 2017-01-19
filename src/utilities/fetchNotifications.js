import store from '../shared/store';
import { updateFetchedBool, updateNotifications, updateUnreadCount } from '../shared/actions';
import buildRequestParameters from './buildRequestParameters';

/**
 * Fetches notifications data from the server
 * @param filter - string of filter name that endpoint recognises (eg favourites)
 */

function fetchNotifications(filter) {

    store.dispatch(updateFetchedBool(false));

    fetch('/notifications?filter=' + filter).then(response=> response.json()).then(response => {
        store.dispatch(updateNotifications(response));
        store.dispatch(updateFetchedBool(true));
        // store.dispatch(updateUnreadCount(response.totalCount));
    });
}

export default fetchNotifications;

