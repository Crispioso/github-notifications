import store from '../store';
import { updateFetchedBool, addNotifications, updateUnreadCount } from '../actions';

/**
 * Fetches notifications data from the server
 * @param parameters - object of parameters and their values to add to the fetch request (eq {repoId: "a12enl", type: "PullRequest"}
 */

function fetchNotifications(parameters) {
    const validParameters = ['repoID', 'type'];
    let validatedParameters;

    if (parameters) {
        validatedParameters = [];
        Object.keys(parameters).forEach(property => {
            if (validParameters.indexOf(property) < 0) {
                console.warn('%s is a invalid parameter so has been excluded from the request', property);
                return;
            }
            validatedParameters.push(property + "=" + parameters[property]);
        });
        validatedParameters = "?" + validatedParameters.join('&');
    }

    fetch('/notificationsData' + (validatedParameters || "")).then(response=> response.json()).then(response => {
        store.dispatch(addNotifications(response.notifications));
        store.dispatch(updateFetchedBool(true));
        store.dispatch(updateUnreadCount(response.metadata.unreadCount));
    });
}

export default fetchNotifications;

