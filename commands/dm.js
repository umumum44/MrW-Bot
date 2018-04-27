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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "dm", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
	console.log(content);
	if(message.author.id === "399975738008141824" || message.author.id === "303683211790254080") {
		var target = message.guild.members.find(member => member.user.tag.toLowerCase().startsWith(content) || member.user.id === args[0] || message.mentions.users.first() === member.user);
		if(target == null) {
			message.reply("Please specify a valid target.").catch(function() {});
		} else {
			target.user.send(content).then(() => {
				message.react("✅").catch(function() {});
			}).catch(() => {
				message.react("❎").catch(function() {});
			});;
		}
	} else {
		message.reply("Only the creator of this bot can use this command.").catch(function() {});
	}
}
module.exports.help = {
	name: "dm"
}
