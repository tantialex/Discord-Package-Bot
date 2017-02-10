
# Discord-Package-Bot
---
A discord-bot package manager built on nodeJs. 
This discord wrapper based on Discordie helps structure a discord bot to be more 
diverse in a simpler way. By adding packages, you are in control of all the 
functions your bot is able to process, whether the bot should pull images from 
the web or interact with the users via a simple game all depends on the packages 
added.

---
## Usage

Things needed to host the bot:
* [NodeJs](https://nodejs.org/en/download/)
* Create a [discord app](https://discordapp.com/developers/applications/me)
* Token from the created discord app

Change the token in config.js to your respective token.

Run app.js to start the bot and connect to respective channels.
```bash
$ node app.js
```

---
## Adding a package

To add a package simply:
	Add the package files to the dir/packages
	Add the package js file name to the 'package' array in config.js

---
## Creating your own package

Packages hold a structure to communicate safely with the package manager.
The following is an example of a package named pkg_testpackage.js

```js
module.exports = {
    name: 'Test Package',
    description: 'A test package for all',
    commands: [
        {
            alias: ['test'],
            help: 'Testing first parent',
            execute: function (msg, params) {
                msg.channel.sendMessage('In test');
            },
            commands: [
                {
                    alias: ['start','go'],
                    help: 'test first child',
                    execute: function (msg, params) {
                        msg.channel.sendMessage('In test start');
                    }
                }, {
                    alias: ['stop'],
                    help: 'test second child',
                    execute: function (msg, params) {
                        msg.channel.sendMessage('In test stop');
                    }
                }
            ]
        }
    ]
};
```
The package must have a name and a description. Following that,
commands can be added in the form of an array. There is currently no
limit as to how many commands a package may contain.

Each command has:
*alias: which is the command-word the user will need to enter to execute the function.
* help: a description of the function which will be displayed on the help command.
*execute: the function that will run when the command is called.
*commands: sub-commands ex: video play, video stop. Play and stop are sub-commands for video.

