/**
 * POST update to the server to update a field for a given notification
 * @param notificationId - ID of the notification that we want to update
 * @param field - The field from the notification object that we're updating
 * @param value - Our new value of the field
 * @param params - Current parameters, so that server can response with correctly filtered list once update has been applied to the database
 * @param callback - Returns response on successful POST
 */

import buildRequestParameters from './buildRequestParameters';

function postNotificationUpdate(notificationId, field, value, parameters, callback) {
    const body = {
        field: field,
        value: value
    };
    const url = `/updateNotification/` + notificationId + buildRequestParameters(parameters);
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    return new Promise((resolve, reject) => {
        fetch(url, options).then(response => response.json()).then(response => {
            resolve(response);
        }).catch(error => {
           reject(error);
        });
    });
}

export default postNotificationUpdate;
