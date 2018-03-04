const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!target) {
    marray = message.guild.members.filter(m => RegExp(name, "gi").test(m.displayName));
    target = marray.first();
  }
  if (target) {
    if(message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("BAN_MEMBERS")) {
      if (args[2] == null) {
        var reason = "No reason specified";
      } else {
        var reason = message.content.substr(7+args[0].length);
      }
      target.DMChannel.send(`You were warned in ${message.guild} for `+`\`${reason}\``+` by ${message.author.username}`);
      // oWo where's the database code ETHAN
      message.delete();
    } else {
      message.reply("Insufficent permissions.");
    }
  } else {
    message.reply("Couldn't find that user!");
  }
}
module.exports.help = {
  name: "warn"
}
