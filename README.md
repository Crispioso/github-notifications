#github-notifications

An attempt to make Github notifications more manageable with custom filters, 'done' and 'favourite' markers, and stopping them from disappearing as soon as they're marked as 'read' (like Github currently does).

This idea was totally stolen from 

##Installation

You'll need to have NodeJS, NPM and [MongoDB](https://docs.mongodb.com/v3.2/installation/) installed first, then:

1. Run `npm install` or `yarn`.
2. Start MongoDB, following MongoDB's ['NodeJS quick start'](http://mongodb.github.io/node-mongodb-native/2.2/quick-start/#start-a-mongodb-server) guide.
3. Create a [Github authentication token](https://help.github.com/articles/creating-an-access-token-for-command-line-use/), which has access to your notifications data.
4. Kick-off the NodeJS server with `OAUTH_TOKEN='<authentication token>' npm start`.
5. I'm sometimes experiencing a bug with `inferno-component` which is fixed by going to `node_modules/inferno-component/inferno-component.js` and amending the require path from `'./../inferno/dist/inferno-component.node'` to `'./../inferno/dist/inferno-component.node'`.

optional:
4. Run `npm run watch`, to watch the client-side JS files and re-build when one is amended.

##Todo

Planned bug fixes, features or ideas (in no particular order):
-  Add the option for notifications, eg [web push API](https://developer.mozilla.org/en/docs/Web/API/Push_API), Slack and email.
- Refactor the server-side code (potentially to Golang).
- Move notification out of a list if an action at that time has meant it no-longer belongs in that list (eg viewing favourites, un-favourite an item, that item should then disappear from the list with refresh).
- Routing to filters.
- Allow user to set all to 'favourite' or 'done' with one click.
- Ability to add your own custom filters.
- Login via Github.
- Pagination on lists of notifications.
- Show all notifications (not just unread).
- Tell Github a notification is read when it's been set to 'done'.
- Hide 'done' from all list and make 'all' some accurate, such as 'to do' or 'inbox'.

