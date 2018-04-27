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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "news", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
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
