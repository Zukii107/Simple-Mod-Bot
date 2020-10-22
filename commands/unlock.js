const Discord = require("discord.js");
const { PREFIX } = require("../config");
module.exports = {
    help: {
        name: "unlock",
        aliases: []
    },
    run: async(client, message, args) => {

        if (!client.lockit) client.lockit = [];
        if (!message.member.hasPermission("MANAGE_CHANNELS"))
            return message.reply({
                embed: {
                    description: '**You are missing \`MANAGE_CHANNELS\` permission**'
                }
            });
    
        message.channel.createOverwrite(message.channel.id, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        }).then(() => {
            message.channel.send({
                embed: {
                    title: `Channel has Been Updates`,
                    color: 0x2C2F33,
                    description: ':white_check_mark: **Lockdown lifted!**'
                }
            });
            delete client.lockit[message.channel.id];
        }).catch(error => {
            console.log(error);
        })
    }
};
