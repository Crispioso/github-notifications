import store from '../shared/store';
import { updateCustomFiltersFetchedBool, updateCustomFilters } from '../shared/actions';

/**
 * Fetches custom filters data from the server
 */

function fetchCustomFilters() {

    store.dispatch(updateCustomFiltersFetchedBool(false));

    fetch('/filters').then(response=> response.json()).then(response => {
        store.dispatch(updateCustomFilters(response));
        store.dispatch(updateCustomFiltersFetchedBool(true));
    });
}

export default fetchCustomFilters;
