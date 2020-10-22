const Discord = require("discord.js");
module.exports = {
    help: {
        name: "ping",
        aliases: ["pong"]
    },
    run: async(client, message, args) => {

        const embed = new Discord.MessageEmbed()
            .setDescription(`Pong! **${Math.round(client.ws.ping)}ms**`)
            .setColor('RANDOM')
        return message.channel.send(embed);
    }
};