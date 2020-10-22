const Discord = require("discord.js");

module.exports = {
    help: {
        name: "slowmode",
        aliases: []
    },
         run: async(client, message, args) => {
        if (!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send({
            embed: {
                color: 0x4D5E94,
                description: 'Your missing \`Manage_Messages\` permission.**'
            }
        })
        if (!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"]))
            return message.channel.send({
                embed: {
                    color: 0x4D5E94,
                    description: '**I am missing \`Manage_Messages\` permission.!**'
                }
            })
    
        if (!args[0]) return message.channel.send({
            embed: {
                color: 0x4D5E94,
                description: '**Please Specify the Time for Slowmode**'
            }
        })
        if (args[0] === "off") {
            message.channel.setRateLimitPerUser(0)
            const embed = new Discord.MessageEmbed()
                .setTitle("Channel has Been Updates")
                .setDescription(":white_check_mark: Slowmode has been turned off!")
                .setColor('#FF0000')
            return message.channel.send(embed);
        } else {
            if (args[0] > 21600) return message.channel.send({
                embed: {
                    color: 0x4D5E94,
                    description: `The maximum slowmode that can be done is 21600 seconds (6 hours). Please input a value between 0 and 21600.`
                }
            })
            if (isNaN(args[0])) return message.channel.send({
                embed: {
                    color: 0x4D5E94,
                    description: `That is not a number, please indicate the slowmode in seconds!`
                }
            });
            message.channel.setRateLimitPerUser(args[0]);
            const embed = new Discord.MessageEmbed()
                .setTitle("Channel has Been Updates")
                .setDescription(":white_check_mark: Slowmode has been set to `" + args[0])
                .setColor('#FF0000')
            return message.channel.send(embed);
        }
    }
}
    