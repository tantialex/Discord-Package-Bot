
# Discord-Package-Bot

A discord-bot package manager built on nodeJs. 
This discord wrapper based on Discordie helps structure a discord bot to be more 
diverse in a simpler way. By adding packages, you are in control of all the 
functions your bot is able to process, whether the bot should pull images from 
the web or interact with the users via a simple game all depends on the packages 
added.

---
## Discordie

The following project was only made possible by [Discordie](https://github.com/qeled/discordie)

To make full use of this project make sure to check out their [documentation](http://qeled.github.io/discordie/)

---
## Usage

Things needed to host the bot:
* [NodeJs](https://nodejs.org/en/download/)
* Create a [discord app](https://discordapp.com/developers/applications/me)
* Token from the created discord app

Change the token in ```config.js``` to your respective token.

Run app.js to start the bot and connect to respective channels.
```bash
$ node app.js
```
---
## The config file

The ```config.js``` file consists of the following properties:
* __token__: The discord bot token, which could be found on their [website](https://discordapp.com/developers/applications/me)
* __main_command__: The command used to communicate with the bot. Ex: ```-b hello``` or ```/b hello```
* __packages__: A list of the package file names included in the bot

---
## Adding a package

To add a package simply:
* Add the package files to the ```dir/packages```
* Add the package js file name to the 'package' array in ```config.js```

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
* __alias__: which is the command-word the user will need to enter to execute the function.
* __help__: a description of the function which will be displayed on the help command.
* __execute__: the function that will run when the command is called.
* __commands__: sub-commands ex: ```-b video play``` and ```-b video stop```. Play and stop are sub-commands for video.

### Parameters
* __msg__: An IMessage which you can read all about in the [Discordie Documentation](https://qeled.github.io/discordie/#/docs/IMessage?_k=wy1mvf)
* __params__: A ```String Array``` of the remaining message from the user input, therefore ```-b video play test.mp4``` will return ```['test.mp4']``` to ```video play```
