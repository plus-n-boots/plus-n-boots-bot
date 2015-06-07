# plus-n-boots

[![Join the chat at https://gitter.im/plus-n-boots/plus-n-boots-bot](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/plus-n-boots/plus-n-boots-bot?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Your friendly +1 management bot.

### Background

Plus-n-boots is built to minimise the noise created by people leaving +1 comments on issues on GitHub.

Inspired by [this issue](https://github.com/isaacs/github/issues/9) the bot creates a comment on each new issue raised as a place to display a list of all +1 commenters. +1 comments are deleted once they're stored.

The bot currently doesn't get around the issue of emails being sent on each new +1.

You can try plus-n-boots out by raising an issue on the [try-me-out repository](https://github.com/plus-n-boots/try-me-out). The bot considers +1, `:+1:` and `:thumbsup:` as a +1.

### Hosted Instance

If you'd prefer not to have to set up your own instance of plus-n-boots then stay keep an eye out for a hosted instance  coming soon which will only require you to add the bot as collaborator on your organisation/repository.

### Dedicated Instance

If you'd prefer to handle things yourself then follow the instructions below.

### Dependencies

* [CouchDB](https://couchdb.apache.org/)
* [Node.js & npm](https://nodejs.org/)

### Setup

##### CouchDB

Plus-n-boots uses CouchDB to persist data. [Iris Couch](http://www.iriscouch.com/) is a quick, easy and free way to set up a hosted instance if you'd prefer not to have to configure and deploy your own instance.

##### GitHub User

You'll need a GitHub user to write comments. You can either use your own account or create a new account to handle this. Be aware that currently plus-n-boots doesn't support accounts which have two factor authentication enabled.

If you use your own account then there's no further setup required. If you create a new account then you'll need to add this user to any organisations/repositories you want the bot to work on.

##### Server

Plus-n-boots is a Node.js web service which listens for events from GitHub via a webhook. The server can be deployed to any platform which can run Node.js.

There are a few steps required before you can begin running the server:

Clone the repository.

```
git clone git@github.com:plus-n-boots/plus-n-boots-bot.git
cd plus-n-boots-bot
```

Install the project dependencies.

```
npm install
```

Build the production code.

```
npm run build
```

You can now start the server, passing through various arguments for configuration.

```
node build/index.js --username=<GitHub username> --password=<GitHub password> --port=<server port> --couch=<CouchDB instance> --couch-port=<CouchDB  port>
```

For example.

```
node build/index.js --username=plus-n-boots-official --password=****** --port=8888 --couch=plusnboots.iriscouch.com --couch-port=443
```

If you'd prefer the config setup to be handled within the source code you can add the same values into the config module (`src/config.js`) then run the above command with no arguments. Be sure to re-build the code (`npm run build`) after making any changes.

If you want to change the messaging written in the issue comments created you can by editing the `src/templates.js` module, again you'll need to re-build the code after making changes.

##### Webhook

Once the server is up and running you need to add a new webhook to your organisation or repository on GitHub.

Navigate to your organisation/repository's settings page then to webhooks and click 'Add webhook'.

The payload URL is the url your application is running on, which will end in `/postreceive`.

Content type and Secret can be left as they are.

Only a couple of events are needed for everything to work so select 'Let me select individual events.' and then choose Issues and Issue comment as the options.

Ensure the webhook is active and click 'Add webhook'.

##### Testing

At this point everything should be up and running. Try creating a test issue on a repository and then leaving a +1 comment, check your CouchDB instance to ensure the data has been stored correctly.

### Feedback

Any feedback/improvements for the code, process and setup guide would be greatly appreciated. All issues/pull requests, no matter how big or small, are welcome.

### Roadmap

Things are still in very early stages right now. Here's a general list of things I'll be looking to implement/fix in the near future:

* Unit & integration tests
* 2FA support
* CLI argument validation/help
* Heroku/Linode/Digital Ocean/AWS etc setup guides
* Ability to -1 after +1'ing
* Ability to retroactively apply plus-n-boots to issue

### License

Released under the MIT license: [opensource.org/licenses/MIT](http://opensource.org/licenses/MIT)
