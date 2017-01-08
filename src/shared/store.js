import { createStore } from 'redux';

const initialState = {
    checked: true,
    dataFetched: false,
    filter: 'all',
    customFilters: [],
    parameters: {},
    unreadCount: 0,
    notifications: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case ('UPDATE_FETCHED_BOOL'): {
            return Object.assign({}, state, {
                dataFetched: action.dataFetched
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
        case ('TOGGLE_CHECKED'): {
            return Object.assign({}, state, {
                checked: action.checked
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
        case ('UPDATE_PARAMETERS'): {
            return Object.assign({}, state, {
                parameters: action.parameters
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