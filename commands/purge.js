const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

if(message.member.hasPermission("MANAGE_MESSAGES")) {
message.channel.bulkDelete(args[0])
.then(messages => message.channel.send(`Deleted ${messages.size} messages!`))
  .catch(console.error);
} else return message.channel.send(`${message.author}, you do not have permission to purge messages!`)

}

module.exports.help = {
    name: "purge"
}
