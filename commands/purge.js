module.exports = {
    help: {
        name: "purge",
        aliases: []
    },

    run: async(client, message, args) => {

        if (message.deletable) {
            await message.delete()
        };
        if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply({
            embed: {
                description: '**You are missing \`MANAGE_MESSAGES\` permission**'
            }
        });
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.reply({
            embed: {
                description: '**Im missing \`MANAGE_MESSAGES\` permission**'
            }
        });
    
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send("I can't delete 0 messages")
            .then(m => m.delete({ timeout: 2000 })) //you can set it timeout. 2000 means is 2 second
        }
    
        let deleteamout;
    
        if (parseInt(args[0]) > 100) {
            deleteamout = 100
        } else {
            deleteamout = parseInt(args[0])
        }
    
        message.channel.bulkDelete(deleteamout, true);
    
        return message.channel.send(`\`\`\`js\n${args[0]} message have been deleted\`\`\``).then(m => m.delete({ timeout: 4000 })) //you can set it timeout. 4000 means is 4 second
    }
};