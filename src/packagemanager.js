'use strict';

const pkgs = [];
const config = require('../config.js');

for (let i = 0; i < config.packages.length; i++) {
    pkgs.push(require('../packages/' + config.packages[i]));
}
function help(msg) {
    let _fields = [];
    for (let i = 0; i < pkgs.length; i++) {
        let nodes = [];
        let stack = [];
        let parent = pkgs[i];
        let parent_l = parent.commands.length;
        let j = 0;
        let pos = 0;
        do {
            while (j < parent_l) {
                let cmd = parent.commands[j];
                nodes.push({ data: cmd, pos: pos });
                if (cmd.commands && (cmd.commands.length > 0)) {
                    stack.push({ node: parent, pos: j });
                    pos++;
                    parent = cmd;
                    j = 0;
                    parent_l = parent.commands.length;
                } else
                    j++;
            };
            if (stack.length > 0) {
                let prevNode = stack.pop();
                pos--;
                parent = prevNode.node;
                j = prevNode.pos + 1;
                parent_l = parent.commands.length;
            }
            else
                parent = null;
        } while (parent);
        _fields.push({ name: 'Package: ' + pkgs[i].name, value: 'Description: ' + pkgs[i].description });
        let nodes_l = nodes.length;
        for (let j = 0; j < nodes_l; j++) {
            let node = nodes[j];
            let prefix = '';
            if (node.pos > 0) {
                for (let k = 0; k < node.pos; k++) {
                    prefix += '‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ‌‌ ';
                }
            }
            prefix += '‌‌ ‌‌ ‌‌ ‌‌‌‌ ';
            _fields.push({ name: prefix + '• ' + node.data.alias, value: prefix + '‌‌ ‌‌ ‌‌' + node.data.help });
        }
    }
    msg.channel.sendMessage('', false, {
        color: 0x00ff33,
        title: 'Help',
        timestamp: new Date(),
        fields: _fields,
    });
}
module.exports = {
    textCommand: function (id, msg, data) {
        let array = data.split(' ');
        if (array[0] === 'help') {
            help(msg);
            return;
        }
        for (let i = 0; i < pkgs.length; i++) {
            let parent = pkgs[i];
            let parent_l = parent.commands.length;
            let j = 0;
            let pos = 0;
            do {
                let cmd = parent.commands[j];
                if (cmd.alias.indexOf(array[pos]) != -1) {
                    if (cmd.commands) {
                        parent = cmd;
                        parent_l = parent.commands.length;
                        j = 0;
                        pos++;
                    } else {
                        if (cmd.execute) {
                            cmd.execute(msg, array.slice(pos + 1, array.length));
                        } else {
                            msg.channel.sendMessage('That command has no function');
                        }
                        return;
                    }
                } else {
                    j++;
                }
            } while (j < parent_l);
            if (parent.execute) {
                parent.execute(msg, array.slice(pos, array.length));
            }
        }
    }
};