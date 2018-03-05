const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
	let helper = new Discord.RichEmbed()
	.setTitle("Commands")
	.addField("8Ball", "An 8-Ball simulator")
	.addField("About", "Gets information about a server member")
	.addField("Ban", "Bans a server member")
	.addField("Kick", "Kicks a server member")
	.addField("Mute", "Mutes a server member")
	.addField("Ping", "Responds with pong!")
	.addField("Purge", "Deletes a specified amount of messages")
	.addField("Report", "Starts a prompt for reporting bugs/glitches in games")
	.addField("Setactivity", "Sets the bot's activity \(Owner-Only\)")
	.addField("Setstatus", "Sets the bot's status \(Owner-Only\)")
	.addField("Unmute", "Unmutes a server member");

	message.react("\u2705")
	message.author.send(helper)
}
module.exports.help = {
	name: "help"
}
