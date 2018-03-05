const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

  let helper = new Discord.RichEmbed()
  .setTitle("Commands")
  .addField("8ball", "An 8-Ball simulator")
  .addField("about", "Gets information about a server member")
  .addField("ban", "Bans a server member")
  .addField("kick", "Kicks a server member")
  .addField("mute", "Mutes a server member")
  .addField("ping", "Responds with pong!")
  .addField("purge", "Deletes a specified amount of messages")
  .addField("report", "Starts a prompt for reporting bugs/glitches in games")
  .addField("setactivity", "Sets the bot's activity \(Owner-Only\)")
  .addField("setstatus", "Sets the bot's status \(Owner-Only\)")
  .addField("unmute", "Unmutes a server member");

  message.react("\u2705")
  message.author.send(helper)
}
module.exports.help = {
    name: "help"
}
