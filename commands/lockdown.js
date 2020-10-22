const { PREFIX } = require("../config");
module.exports = {
    help: {
        name: "lockdown",
        aliases: ["lock"]
    },
    run: async(client, message, args) => {

           if (!client.lockit) client.lockit = [];
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.reply({
        embed: {
            description: '**You are missing \`MANAGE_CHANNELS\` permission**'
        }
    });

    message.channel.createOverwrite(message.guild.id, {
        SEND_MESSAGES: false,
        READ_MESSAGES: true,
        ADD_REACTIONS: false
    })
    message.channel.send({
        embed: {
            title: `Channel has Been Updates`,
            description: ':white_check_mark: **Locking the Channel!**',
            footer: {
                text: `${PREFIX}unlock to Open Channels`
           
            }
        }
    })
    }
};