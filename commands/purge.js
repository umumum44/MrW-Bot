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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "purge", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
                let num = parseInt(args[0]);
                if (!num) return message.reply("You must provide the number of messages to delete!");
                if (num > 99) return message.reply("You can only purge 99 messages at a time!");
                message.channel.bulkDelete(num + 1)
                        .then(messages => message.reply(`Deleted ${messages.size - 1} messages that were not over two weeks old!`))
                        .catch(console.error);
        } else return message.reply(`You do not have permission to purge messages!`);
}
module.exports.help = {
        name: "purge"
}
