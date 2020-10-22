const db = require('quick.db');

module.exports = {
    help: {
        name: "warnings",
        aliases: ["checkwarn"]
    },
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;


        let warnings = await db.get(`warnings_${message.guild.id}_${user.id}`);
        if(warnings === null) 
        return message.channel.send({
            embed: {
                color: 0x0B0B0B,
                description: `There are no warnings.`
            }
        });
        
        if(warnings === null) warnings = 0;

        message.channel.send({
            embed: {
                color: 0x0B0B0B,
                
                description: `**${user.username}** has **${warnings}** Warning`,
                footer: {
                    name: client.user.username,
                    icon_url: client.user.displayAvatarURL(),
                },
            }
        });
    }
}