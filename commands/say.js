const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, content) => {
message.channel.send(message.cleanContent)
message.delete()
}
module.exports.help = {
	name: "say"
}
