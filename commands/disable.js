const Discord = require("discord.js");
*/async function checkIfDisabled(cmdname) {
        var checkerChannel = bot.channels.find(`id`, "439530415984738316")
        var messages = checkerChannel.fetchMessages({
                limit: 100
        });
       var dismessage = messages.find(m => m.content === `${message.guild.id} ${cmdname}`)
       if(dismessage) {
       return (true);
        } else {
      return (false);
      }
}*/
module.exports.run = async (bot, message, args, prefix, content) => {
if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You do not have permission to use this command!")



}
module.exports.help = {
	name: "disable"
}
