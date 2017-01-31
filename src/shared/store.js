import { createStore } from 'redux';

const initialState = {
    notificationsFetched: false,
    filtersFetched: false,
    filter: '',
    unreadCount: 0,
    notifications: [],
    customFilters: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case ('UPDATE_NOTIFICATIONS_FETCHED_BOOL'): {
            return Object.assign({}, state, {
                notificationsFetched: action.notificationsFetched
            })
        }
        case ('UPDATE_NOTIFICATIONS'): {
            return Object.assign({}, state, {
                notifications: action.notifications
            })
        }
        case ('UPDATE_UNREAD_COUNT'): {
            return Object.assign({}, state, {
                unreadCount: action.unreadCount
            })
        }
        case ('TOGGLE_READ'): {
            return Object.assign({}, state, {
                notifications: action.notifications
            });
        }
        case ('UPDATE_FILTER'): {
            return Object.assign({}, state, {
                filter: action.filter
            })
        }
        case ('UPDATE_FILTERS_FETCHED_BOOL'): {
            return Object.assign({}, state, {
                filtersFetched: action.filtersFetched
            })
        }
        case ('UPDATE_CUSTOM_FILTERS'): {
            return Object.assign({}, state, {
                customFilters: action.customFilters
            })
        }
        default: {
            console.log("Action type '%s' unrecognised", action.type);
            return state;
        }
    }
}

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;