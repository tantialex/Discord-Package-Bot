'use strict';

const Discordie = require('discordie');
const Events = Discordie.Events;
const client = new Discordie();
const pkgM = require('./src/PackageManager.js');
const config = require('./config.js');
const BOT_COMMAND = config.main_command;

client.connect({
    token: config.token
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
    console.log("Bot Connected");
});

client.Dispatcher.on(Events.MESSAGE_CREATE, e => {
    let data = e.message.content;
    if (data.substring(0, BOT_COMMAND.length).toUpperCase() === (BOT_COMMAND).toUpperCase()) {
        data = data.substring(BOT_COMMAND.length, data.length);
    }
    else if (!e.message.channel.isDM) {
        return;
    }
    pkgM.textCommand(e.message.channel.guild_id, e.message, data);
});