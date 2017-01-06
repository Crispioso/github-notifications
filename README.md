#github-notifications

A very small proof of concept and testing a few technologies (ie MongoDB and Preact).

##Installation

You'll need to have NodeJS, NPM and [MongoDB](https://docs.mongodb.com/v3.2/installation/) installed first, then:

1. Run `npm install` or `yarn`.
2. Start MongoDB, following MongoDB's ['NodeJS quick start'](http://mongodb.github.io/node-mongodb-native/2.2/quick-start/#start-a-mongodb-server) guide.
3. Create a [Github authentication token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/), which has access to your notifications data.
4. Kick-off the NodeJS server with `OAUTH_TOKEN='<authentication token>' npm start`.
5. I'm experiencing a bug with `inferno-component` which is fixed by going to `node_modules/inferno-component/inferno-component.js` and amending the require path from `'./../inferno/dist/inferno-component.node'` to `'./../inferno/dist/inferno-component.node'`.

optional:
4. Run `npm run watch`, to watch the client-side JS files and read-build when one is amended.