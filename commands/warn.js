const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!target) {
    marray = message.guild.members.filter(m => RegExp(name, "gi").test(m.displayName));
    target = marray.first();
  }
  if (target) {
    if(message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("BAN_MEMBERS")) {
      if (message.member.highestRole.position < target.highestRole.position) return message.reply("You are not high enough in this guild's hierarchy to warn this user.");
      var reason;
      if (args[1] == null) {
        // checks if there is a reason
        reason = "No reason specified";
      } else {
        reason = message.content.substr(7+args[0].length);
        // takes out the user mention/id/name and command to result in everything else
      }
      message.delete();
      target.send(`You were warned in ${message.guild} for `+`\`${reason}\``+` by ${message.author.username}`);
      var dbchannel = bot.channels.get("420706931011747842");
      var db = dbchannel.fetchMessages()
      var warningschannel = bot.channels.get("420708216188567552");
      db.forEach(function(msg) {
        var msgcontent = msg.content
        let messageArray = msgcontent.split(" ");
        let args = messageArray.slice(1);
        if (msgcontent.startsWith(`${message.guild.id} ${target.id}`)) {
          var amount = args[2];
          msg.edit(`${message.guild.id} ${target.id} ${amount+1}`);
          amount = amount+1;
          warningschannel.send(`${message.guild.id} ${target.id} ${reason}`);
          if (amount == 3) {
            target.kick("Reaching 3 warnings");
          } else if (amount == 6) {
            target.kick("Reaching 6 warnings");
          } else if (amount == 9) {
            target.ban("Reaching 9 warnings");
          }
        } else {
          dbchannel.send(`${message.guild.id} ${target.id} 1`);
        }
      });
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
