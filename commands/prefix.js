const Discord = require("discord.js");
async function checkIfDisabled(bot, message, args, cmdname, channelsa) {
                const nestedMessages = await Promise.all(channelsa.map(ch => ch.fetchMessages({
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
        let channelsa = dbguild.channels.filter(m => RegExp("wbotdisable-database", "gi").test(m.name));
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "prefix", channelsa)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have permission to use this command!")
        if (!args[0]) return message.reply("Please provide the new prefix!")
        let prefix = args[0]
        if (prefix.length > 5) return message.reply("The prefix cannot be more than 5 characters!")
        let dbguild = bot.guilds.find(`id`, "417149156193337344");
        let channel = dbguild.channels.find(`name`, "wbotprefixes-database")
        let messages = await channel.fetchMessages({
                limit: 100
        })
        let channels = dbguild.channels.filter(m => RegExp("wbotprefixes-database", "gi")
                .test(m.name));
        channels.forEach(chl => {
                chl.fetchMessages({
                                limit: 100
                        })
                        .then(msgs => {
                                msgs.forEach(msg => {
                                        if (msg.content.startsWith(`${message.guild.id}`)) {
                                                msg.delete()
                                        }
                                })
                        })
        })
        if (messages.size === 100) {
                await channel.setName("o-wbotprefixes-database")
                await dbguild.createChannel('wbotprefixes-database')
                let newc = dbguild.channels.find(`name`, "wbotprefixes-database")
                await newc.overwritePermissions(channel.guild.id, {
                        READ_MESSAGES: false
                })
                await newc.setParent("422122104499208214");
                await newc.send(`${message.guild.id} ${prefix}`);
                message.react("\u2705")
        } else {
                channel.send(`${message.guild.id} ${prefix}`)
                message.react("\u2705")
        }
}
module.exports.help = {
        name: "prefix"
}
