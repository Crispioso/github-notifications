/**
 * Extends and interacts with Material UI JS (which is outside the control of Inferno)
 */

import hasClass from '../utilities/hasClass';

function closeDrawer() {
    const drawer = document.getElementsByClassName('mdl-layout__drawer')[0];
    const background = document.getElementsByClassName('mdl-layout__obfuscator')[0];
    const icon = document.getElementsByClassName('mdl-layout__drawer-button')[0];
    drawer.classList.remove('is-visible');
    drawer.setAttribute('aria-hidden', true);
    background.classList.remove('is-visible');
    icon.setAttribute('aria-expanded', false);
}

// All delegated click events
document.getElementById('app').addEventListener('click', function(event) {
    const element = event.target;

    // Filter has been clicked - close off-canvas menu
    if (hasClass(element, 'mdl-navigation__link')) {
        closeDrawer();
    }

    // Add custom filter button pressed - close off-canvas menu
    if (element.getAttribute('id') === 'add-filter') {
        closeDrawer()
    }
});
