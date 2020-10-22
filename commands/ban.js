const Discord = require("discord.js");
module.exports = {
    help: {
        name: "ban",
        aliases: ["banned"]
    },
    run: async(client, message, args) => {
        if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
            let botnopermsembed = new Discord.MessageEmbed()
                .setDescription(
                    "Im missing `BAN MEMBERS` permission"
                )
                .setColor("#0B0B0B");
            message.channel.send(botnopermsembed);

            return;
        }
        if (!message.member.permissions.has("BAN_MEMBERS")) {
            let nopermsembed = new Discord.MessageEmbed()
                .setDescription(
                    "You are missing `BAN MEMBERS` Permission"
                )
                .setColor("#0B0B0B");
            message.channel.send(nopermsembed);

            return;
        }
        let Member = message.mentions.users.first();

        if (!Member)
            return message.channel.send({
                embed: {
                    color: 0x0B0B0B,
                    description: `Please Mention A Member That You Want To ban!`
                }
            });

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
                    description: ` ** You Can 't Ban Your Self!**`
                }
            });

        if (Member.id === client.user.id)
            return message.channel.send({
                embed: {
                    color: 0x4D5E94,
                    description: `**You Can't Ban me**`
                }
            });

        if (Member.id === message.guild.owner.user.id)
            return message.channel.send({
                embed: {
                    color: 0x4D5E94,
                    description: `**You Can't Ban the Server Owner**`
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
                description: `**I Can't Ban That Member Because That Member Has Role Position Is Higher Than My Role Or Same Role As You!**`
            }
        });

        if (BotRole <= Role) return message.channel.send({
            embed: {
                color: 0x4D5E94,
                description: `**I Can't Ban That Member Because That Member Has Role Position Is Higher Than My Role Or Same Role As Me!**`
            }
        });

        if (!User.bannable) return message.channel.send({
            embed: {
                color: 0x4D5E94,
                description: `**I Can't Ban That Member!**`
            }
        })

        try {
            setTimeout(function() {
                User.ban({ reason: `${Reason || "No Reason Provided!"}` });
            }, 2000);
            let embed = new Discord.MessageEmbed()
                .setColor('#2C2F33')
                .setTitle(`Member Banned!`)
                .addField(`Moderator`, `${message.author.tag} (${message.author.id}`)
                .addField(`Banned Member`, `${Member.tag} (${Member.id})`)
                .addField(`Reason`, `${Reason || "No Reason Provided!"}`)
                .setFooter(client.user.username, client.user.displayAvatarURL())
                .setTimestamp();
            if (User && Member.bot === false)
                Member.send(
                    `You Have Been Banned From **${message.guild.name}** For ${Reason ||
            "No Reason Provided!"}`
                );
            message.channel.send(embed);
        } catch (error) {
            return message.channel
                .send({
                    embed: {
                        color: 0x4D5E94,
                        description: `**I Can't Ban That Member Maybe Member Has Higher Role Than Me & My Role Is Lower Than Member!**`
                    }
                })
                .then(() => console.log(error));
        }}

}