const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
	let helper = new Discord.RichEmbed()
	.setTitle("Commands")
	.setDescription("**Bot Prefix: !!**")
	.addField("Fun Commands", "!!8ball - An 8-Ball Simulation\n!!rps - Plays a game of rock-paper-scissors")
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
	.addField("Server", "Sends the link to the support server")
	.addField("Invite", "Sends the link to invite me")




	message.react("\u2705")
	message.author.send(helper)
}
module.exports.help = {
	name: "help"
}
