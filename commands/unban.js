const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
  let name = `${args[0]}`
  if(message.member.hasPermission("BAN_MEMBERS")) {
    let tounban = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tounban) {
      marray = message.guild.fetchBans().filter(m => RegExp(name, "gi").test(m.displayName))
      tounban = marray.first()
    }
    if(!tounban) return message.reply("Couldn't find this user.")
      tounban.unban()
      message.react("\u2705")

}
}
module.exports.help = {
    name: "unmute"
}
