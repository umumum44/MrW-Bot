const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

if(message.member.hasPermission("MANAGE_MESSAGES")) {
  let num = parseInt(args[0])
  if(!num) return message.channel.send("You must provide the number of messages to delete!")
  if(num > 100) return message.channel.send("You can only purge 100 messages at a time!")
message.channel.bulkDelete(args[0])
.then(messages => message.channel.send(`Deleted ${messages.size} messages that were not over two weeks old!`))
  .catch(console.error);
} else return message.channel.send(`${message.author}, you do not have permission to purge messages!`)
}

module.exports.help = {
    name: "purge"
}
