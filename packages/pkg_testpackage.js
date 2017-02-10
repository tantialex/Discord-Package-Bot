module.exports = {
    name: 'Test Package',
    description: 'A test package for all',
    commands: [
        {
            alias: ['test'],
            help: 'Testing first parent',
            execute: function (msg, params) {
                msg.channel.sendMessage('In Test');
            },
            commands: [
                {
                    alias: ['start'],
                    help: 'Testing first child',
                    execute: function (msg, params) {
                        msg.channel.sendMessage('In Test Start');
                    }
                }, {
                    alias: ['stop'],
                    help: 'Testing second child',
                    execute: function (msg, params) {
                        msg.channel.sendMessage('In Test Stop');
                    }
                }, {
                    alias: ['fake'],
                    help: 'Testing third child'
                }
            ]
        }
    ]
};