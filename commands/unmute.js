exports.run = async(client, message, args, guildConf, userConf) => {
      if (!message.member.hasPermission("MANAGE_ROLES")) {
        return message.channel.send({
            embed: {
                description: '**You dont have \`MANAGE_ROLES\` permission**'
            }
        });
      }
  
      if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
        return message.channel.send("I do not have permission to manage roles.");
      }
  
      const user = message.mentions.members.first();
  
      if (!user) {
        return message.channel.send(
          "Please mention the member to who you want to unmute"
        );
      }
      
      let muterole = message.guild.roles.cache.find(x => x.name === "muted") //from database that make muted roles
      
      
   if(user.roles.cache.has(muterole)) {
        return message.channel.send("Given User do not have mute role so what i am suppose to take")
      }
      
      
      user.roles.remove(muterole)
      
      await message.channel.send(`**${message.mentions.users.first().username}** is unmuted`)
      
      user.send(`You are now unmuted from **${message.guild.name}**`)

  };
  module.exports.help = {
    name: "unmute",
    description: "Unmute member",
    dm: false,
    aliases: []
}
