/**
 * POST update to the server to update a field for a given notification
 * @param notificationId - ID of the notification that we want to update
 * @param field - The field from the notification object that we're updating
 * @param value - Our new value of the field
 * @param callback - Returns response on successful POST
 */

function postNotificationUpdate(notificationId, field, value, callback) {
    const body = {
        field: field,
        value: value
    };
    const url = `/updateNotification/` + notificationId;
    const options = {
        method: "POST",
        body: JSON.stringify(body),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    };

    fetch(url, options).then(response => response.json()).then(response => {
        callback(response);
    })
}

export default postNotificationUpdate;
