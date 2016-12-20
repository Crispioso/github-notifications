import store from '../store';
import { updateFetchedBool, addNotifications } from '../actions';

function fetchNotifications() {
    fetch('/notificationsData').then(response=> response.json()).then(response => {
        store.dispatch(addNotifications(response));
        store.dispatch(updateFetchedBool(true));
    });
}

export default fetchNotifications;

