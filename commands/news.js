const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, content) => {
	let channel = bot.channels.find(`id`, "430477691154595852")
	let editor = await channel.fetchMessage("430478034160713728")
	let thing = new Discord.RichEmbed()
		.setTitle("News")
		.setDescription(editor.content)
		.setFooter(`Requested by ${message.author.tag}`)
	await message.channel.send(thing)
}

module.exports.help = {
	name: "news"
}
