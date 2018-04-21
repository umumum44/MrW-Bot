const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, content) => {
let msg = message.cleanContent
msg.substr(prefix.length+4)
message.channel.send(message.cleanContent)
message.delete()
}
module.exports.help = {
	name: "say"
}
