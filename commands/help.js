const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
	let helper = new Discord.RichEmbed()
	.setTitle("Commands")
	.addField("8Ball", "An 8-Ball simulator")
	.addField("About", "Gets information about a server member")
	.addField("AFK", "Sets a message to be sent whenever you are pinged")
	.addField("Ban", "Bans a server member")
	.addField("Kick", "Kicks a server member")
	.addField("Mute", "Mutes a server member")
	.addField("Ping", "Responds with pong!")
	.addField("Purge", "Deletes a specified amount of messages")
	.addField("Report", "Starts a prompt for reporting bugs/glitches in games")
	.addField("Unmute", "Unmutes a server member")
	.addField("Warn", "Warns a user")
	.addField("Warnings", "Shows the warnings for a user")



	message.react("\u2705")
	message.author.send(helper)
}
module.exports.help = {
	name: "help"
}
