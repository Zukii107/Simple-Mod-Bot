const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    help: {
        name: "warn",
        aliases: []
    },
    run: async(client, message, args) => {
    if (!message.guild.me.permissions.has("MANAGE_SERVER")) {
        let botnopermsembed = new Discord.MessageEmbed()
            .setDescription(
                "I do not have `Manage_Server` permission, please contact an administrator"
            )
            .setColor("#0B0B0B");
        message.channel.send(botnopermsembed);

        return;
            }
            if (!message.member.permissions.has("MANAGE_SERVER")) {
                let nopermsembed = new Discord.MessageEmbed()
                    .setDescription(
                        "You do not have permission `Manage_Server` please contact an administrator"
                    )
                    .setColor("#0B0B0B");
                message.channel.send(nopermsembed);
    
                return;
            }

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]);

        if(!user) return message.channel.send({
            embed: {
                color: 0x0B0B0B,
                description: `Please a specify user. From mention or ID`
            }
        });

        if(user.bot) return message.channel.send({
            embed: {
                color: 0x0B0B0B,
                description: `You can\`t warn bots`
            }
        });

        if(message.guild.owner.id === user.id) return message.channel.send({
            embed: {
                color: 0x0B0B0B,
                description: `You can\`t warn Server Owner`
            }
        });

        let reason = args.slice(1).join(" ");

        if(!reason) reason = 'Unspecified';

        let warnings = db.get(`warnings_${message.guild.id}_${user.id}`);

        if(warnings === null) {
            db.set(`warnings_${message.guild.id}_${user.id}`, 1);
            await message.channel.send(`**${user.username}** has been warned`)
        }

        if(warnings !== null){
            db.add(`warnings_${message.guild.id}_${user.id}`, 1)
            await message.channel.send(`**${user.username}** has been warned`)
        }
    }
}
    