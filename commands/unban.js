const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let name = `${args[0]}`
  if(message.member.hasPermission("BAN_MEMBERS")) {
    
    if(!name) return message.reply("You must provide a user ID!")
      try {
    message.guild.unban(name)
      message.react("\u2705")
         } catch (e) {
        return message.channel.send("Couldn't find this user!")            
         }

}
}
module.exports.help = {
    name: "unban"
}
