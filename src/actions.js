/** Actions to update state */

export const TOGGLE_READ = 'TOGGLE_READ';
export const ADD_NOTIFICATIONS = 'ADD_NOTIFICATIONS';
export const TOGGLE_CHECKED = 'TOGGLE_CHECKED';
export const UPDATE_FETCHED_BOOL = 'UPDATE_FETCHED_BOOL';

export function toggleRead(boolean) {
    return {
        type: TOGGLE_READ,
        read: boolean
    }
}

export function updateFetchedBool(boolean) {
    return {
        type: UPDATE_FETCHED_BOOL,
        dataFetched: boolean
    }
}

export function addNotifications(notifications) {
    return {
        type: ADD_NOTIFICATIONS,
        notifications: notifications
    }
}

export function toggleChecked(notificationId, checked) {
    return {
        type: TOGGLE_CHECKED,
        notificationId: notificationId,
        checked: checked
    }
}