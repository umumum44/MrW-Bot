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
module.exports.run = async (bot, message, args) => {
         let channels = dbguild.channels.filter(m => RegExp("wbotdisable-database", "gi").test(m.name));
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "ping", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
        message.reply(`pong! \`${Math.floor(bot.ping)}ms\``)
                .catch(function () {});
}
module.exports.help = {
        name: "ping"
}
