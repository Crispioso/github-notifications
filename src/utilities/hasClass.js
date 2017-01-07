/**
 * Vanilla JS version of the jQuery hasClass function - credit goes to https://gist.github.com/jjmu15/8646098
 */

export default function hasClass(el, cls) {
    return el.className && new RegExp("(\\s|^)" + cls + "(\\s|$)").test(el.className);
}