import store from '../shared/store';
import { updateFetchedBool, updateNotifications, updateUnreadCount } from '../shared/actions';
import models from '../models/models';

/**
 * Fetches notifications data from the server
 * @param parameters - object of parameters and their values to add to the fetch request (eq {repoId: "a12enl", type: "PullRequest"}
 */

function fetchNotifications(parameters) {
    let validatedParameters;
    
    if (parameters) {
        validatedParameters = [];
        Object.keys(parameters).forEach(property => {
            if (models.parameters[property] === undefined) {
                console.warn('%s is an invalid parameter so has been excluded from the request', property);
                return;
            }
            validatedParameters.push(property + "=" + parameters[property]);
        });
        validatedParameters = "?" + validatedParameters.join('&');
    }

    fetch('/notificationsData' + (validatedParameters || "")).then(response=> response.json()).then(response => {
        store.dispatch(updateNotifications(response.notifications));
        store.dispatch(updateFetchedBool(true));
        store.dispatch(updateUnreadCount(response.metadata.unreadCount));
    });
}

export default fetchNotifications;

