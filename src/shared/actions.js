/** Actions to update state */

export const TOGGLE_READ = 'TOGGLE_READ';
export const UPDATE_NOTIFICATIONS = 'UPDATE_NOTIFICATIONS';
export const UPDATE_NOTIFICATIONS_FETCHED_BOOL = 'UPDATE_NOTIFICATIONS_FETCHED_BOOL';
export const UPDATE_UNREAD_COUNT = 'UPDATE_UNREAD_COUNT';
export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_CUSTOM_FILTERS = 'UPDATE_CUSTOM_FILTERS';
export const UPDATE_FILTERS_FETCHED_BOOL = 'UPDATE_FILTERS_FETCHED_BOOL';

export function updateFilter(filter) {
    return {
        type: UPDATE_FILTER,
        filter: filter
    }
}

export function updateNotificationsFetchedBool(boolean) {
    return {
        type: UPDATE_NOTIFICATIONS_FETCHED_BOOL,
        notificationsFetched: boolean
    }
}

export function updateNotifications(notifications) {
    return {
        type: UPDATE_NOTIFICATIONS,
        notifications: notifications
    }
}

export function updateCustomFilters(customFilters) {
    return {
        type: UPDATE_CUSTOM_FILTERS,
        customFilters: customFilters
    }
}

export function updateCustomFiltersFetchedBool(boolean) {
    return {
        type: UPDATE_FILTERS_FETCHED_BOOL,
        filtersFetched: boolean
    }
}

export function updateUnreadCount(unreadCount) {
    return {
        type: UPDATE_UNREAD_COUNT,
        unreadCount: unreadCount
    }
}