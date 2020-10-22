const db = require('quick.db');
const warnings = require('./warnings');
module.exports = {
    help: {
        name: "deletewarnings",
        aliases: ["deletewarn", "deletewarning", "clearwarn"]
    },
    run: (client, message, args) => {
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
        if(warnings === null) return message.channel.send({
            embed: {
                color: 0x0B0B0B,
                description: `There are no warnings.`
            }
        });


        db.delete(`warnings_${message.guild.id}_${user.id}`);

        message.channel.send({
            embed: {
                description: `:white_check_mark: Success Deleted <@${user.id}> Warnings!`
            }
        })
    }
    }