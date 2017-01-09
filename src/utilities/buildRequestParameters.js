/**
 * Take in an object of parameters, validates them and return a string for the server query
 *
 * @param parameters - object of parameters and their values to add to the fetch request (eq {repoId: "a12enl", type: "PullRequest"}
 * @return string/bool - a string or false if no parameters have been passed in.
 */

import models from '../models/models';


function buildRequestParameters(parameters) {
    if (parameters) {
        let validatedParameters = [];
        Object.keys(parameters).forEach(property => {
            if (models.parameters[property] === undefined) {
                console.warn('%s is an invalid parameter so has been excluded from the request', property);
                return;
            }
            validatedParameters.push(property + "=" + parameters[property]);
        });
        return "?" + validatedParameters.join('&');
    }

    return false;
}

export default buildRequestParameters;
