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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "countstatus", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
        let guild = bot.guilds.find(`id`, "410400562232819723")
        let member = await guild.fetchMember(message.author.id)
        if (!member) return;
        if (member.roles.get("410481036162760722")) { //owner 
                if (bot.counter === false) {
                        bot.user.setActivity(`${bot.guilds.size} servers`, {
                                type: "WATCHING"
                        });
                        message.react("\u2705")
                        bot.counter = true
                } else if (bot.counter === true) {
                        bot.user.setActivity("Games", {
                                type: "PLAYING"
                        });
                        message.react("\u2705")
                        bot.counter = false
                }
        }
}
module.exports.help = {
        name: "countstatus"
}
