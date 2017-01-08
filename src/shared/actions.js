/** Actions to update state */

export const TOGGLE_READ = 'TOGGLE_READ';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const TOGGLE_CHECKED = 'TOGGLE_CHECKED';
export const UPDATE_FETCHED_BOOL = 'UPDATE_FETCHED_BOOL';
export const UPDATE_UNREAD_COUNT = 'UPDATE_UNREAD_COUNT';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_PARAMETERS = 'UPDATE_PARAMETERS';


export function toggleRead(boolean) {
    return {
        type: TOGGLE_READ,
        read: boolean
    }
}

export function updateParameters(parameters) {
    return {
        type: UPDATE_PARAMETERS,
        parameters: parameters
    }
}

export function updateFilter(filter) {
    return {
        type: UPDATE_FILTER,
        filter: filter
    }
}

export function updateFetchedBool(boolean) {
    return {
        type: UPDATE_FETCHED_BOOL,
        dataFetched: boolean
    }
}

export function updateNotifications(notifications) {
    return {
        type: UPDATE_NOTIFICATIONS,
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

export function updateUnreadCount(unreadCount) {
    return {
        type: UPDATE_UNREAD_COUNT,
        unreadCount: unreadCount
    }
}