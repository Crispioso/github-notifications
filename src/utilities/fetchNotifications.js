import store from '../shared/store';
import { updateFetchedBool, updateNotifications, updateUnreadCount } from '../shared/actions';
import buildRequestParameters from './buildRequestParameters';

/**
 * Fetches notifications data from the server
 * @param parameters - object of parameters and their values to add to the fetch request (eq {repoId: "a12enl", type: "PullRequest"}
 */

function fetchNotifications(parameters) {
    let validatedParameters = buildRequestParameters(parameters);

    store.dispatch(updateFetchedBool(false));

    fetch('/notificationsData' + (validatedParameters || "")).then(response=> response.json()).then(response => {
        store.dispatch(updateNotifications(response.notifications));
        store.dispatch(updateFetchedBool(true));
        store.dispatch(updateUnreadCount(response.metadata.unreadCount));
    });
}

export default fetchNotifications;

