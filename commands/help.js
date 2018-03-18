const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
	let helper = new Discord.RichEmbed()
	.setTitle("Commands")
	.setDescription("**Bot Prefix: !!**")
	.addField("Fun", "!!8ball - An 8-Ball Simulation\n!!rps - Plays a game of rock-paper-scissors")
	.addField("Information", "!!about - Gets information about a server member\n!!server - Sends the link to the support server\n!!invite - Sends the link to invite me")
	.addField("Moderation", "!!ban - Bans a server member\n!!kick - Kicks a server member\n!!mute - Mutes a server member\n!!unmute - Unmutes a server member\n!!purge - Deletes a specified amount of messages\n!!warn - Warns a user\n!!warnings - Shows the warnings for a user")
	.addField("Miscellaneous", "!!afk - Sets a message to be sent whenever you are pinged\n!!report - Starts a prompt for reporting bugs/glitches in games\n!!ping - Responds with the speed of the bot")

	message.react("\u2705")
	message.author.send(helper)
}
module.exports.help = {
	name: "help"
}
