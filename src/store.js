import { createStore } from 'redux';

const initialState = {
    checked: true,
    dataFetched: false,
    notifications: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case ('UPDATE_FETCHED_BOOL'): {
            return Object.assign({}, state, {
                dataFetched: action.dataFetched
            })
        }
        case ('ADD_NOTIFICATIONS'): {
            return Object.assign({}, state, {
                notifications: action.notifications
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
        default: {
            console.log("Action type '%s' unrecognised", action.type);
            return state;
        }
    }
}

let store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;