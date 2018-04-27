const Discord = require("discord.js");
async function checkIfDisabled(bot, message, args, cmdname, channels) {
                const nestedMessages = await Promise.all(channels.map(ch => ch.fetchMessages({
                        limit: 100
                })))
                const flatMessages = nestedMessages.reduce((a, b) => a.concat(b))
                const msg = flatMessages.find(msg => msg.content.startsWith(`${message.guild.id} ${cmdname}`))
		if(msg) {
			return(true)
		} else {
			return(false)
		}
}
module.exports.run = async (bot, message, args, prefix, content) => {
	let channels = dbguild.channels.filter(m => RegExp("wbotdisable-database", "gi").test(m.name));
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "channelinfo", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
	let channel = message.channel

	let channelem = new Discord.RichEmbed()
		.setTitle(`#${channel.name}`)
		.addField("Channel ID", channel.id)
		.addField("Created At", channel.createdAt)
		.addField("Channel Position", channel.position)
		.addField("Category", channel.parent)


	message.channel.send(channelem);
}
module.exports.help = {
	name: "channelinfo"

}
