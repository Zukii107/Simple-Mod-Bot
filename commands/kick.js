const { MessageEmbed } = require("discord.js");
module.exports = {
    help: {
        name: "kick",
        aliases: []
    },
    run: (client, message, args) => {
        if (!message.member.permissions.has("KICK_MEMBERS")) {
            let nopermsembed = new Discord.MessageEmbed()
                .setDescription(
                    "You are missing `KICK MEMBERS` Permission!"
                )
                .setColor("#0B0B0B");
            message.channel.send(nopermsembed);
    
            return;
        }
    
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
            let botnopermsembed = new Discord.MessageEmbed()
                .setDescription(
                    "I do not have `KICK MEMBERS` Permission!"
                )
                .setColor("#0B0B0B");
            message.channel.send(botnopermsembed);
    
            return;
        }
        // MESSAGES
        let Member = message.mentions.users.first();

    if (!Member)
    return message.channel.send(
        `Please Mention A Member That You Want To Kick!`
    );

if (!message.guild.members.cache.get(Member.id))
    return message.channel.send({
        embed: {
            color: 0x4D5E94,
            description: `**Please mention Valid User**`
        }
    });


if (Member.id === message.author.id)
    return message.channel.send({
        embed: {
            color: 0x4D5E94,
            description: `** You Can't kick Your Self!**`
        }
    });

if (Member.id === client.user.id)
    return message.channel.send({
        embed: {
            color: 0x4D5E94,
            description: `**You Can't kick me**`
        }
    });

if (Member.id === message.guild.owner.user.id)
    return message.channel.send({
        embed: {
            color: 0x4D5E94,
            description: `**You Can't kick the Server Owner**`
        }
    });
let Reason = args.slice(1).join(" ");

let User = message.guild.member(Member);

let BotRole = message.guild.member(message.guild.me).roles.highest.position;

let Role = User.roles.highest.position;

let UserRole = message.member.roles.highest.position;

if (UserRole <= Role) return message.channel.send({
    embed: {
        color: 0x4D5E94,
        description: `**I Can't kick That Member Because That Member Has Role Position Is Higher Than My Role Or Same Role As You!**`
    }
});

if (BotRole <= Role) return message.channel.send({
    embed: {
        color: 0x4D5E94,
        description: `**I Can't kick That Member Because That Member Has Role Position Is Higher Than My Role Or Same Role As Me!**`
    }
});

if (!User.kickable) return message.channel.send({
    embed: {
        color: 0x4D5E94,
        description: `**I Can't kick That Member!**`
    }
})
try {
    setTimeout(function() {
        User.kick({ reason: `${Reason || "No Reason Provided!"}` });
    }, 2000);
    let embed = new Discord.MessageEmbed()
        .setColor('#2C2F33')
        .setTitle(`Member Kicked!`)
        .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
        .addField(`Kicked Member`, `${Member.tag} (${Member.id})`)
        .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
        .setFooter(client.user.username, client.user.displayAvatarURL())
        .setTimestamp();
    if (User && Member.bot === false)
        Member.send(
            `You Have Been Kicked From **${message.guild.name}** For ${Reason ||
      "No Reason Provided!"}`
        );
    message.channel.send(embed);
   
} catch (error) {
    return message.channel
        .send({
            embed: {
                color: 0x4D5E94,
                description: `**I Can't Kick That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!**`
            }
        })
        .then(() => console.log(error));
}

//End
    }
};
