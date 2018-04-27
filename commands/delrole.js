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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "delrole", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
	if(args[0] === undefined) return message.reply("Please specify the following params (required). `!delrole (role name)`.");
	var choice;
	if(content.length < 5) {
		choice = message.guild.roles.find(role => role.name.toLowerCase() === content.toLowerCase());
		if(choice === null) return message.reply("For safety reasons, please supply a role name greater than five characters. If the full role name is 5 or less characters, mimic the role name letter for letter.").catch(function() {});
		choice.delete().then(() => {
			message.reply(`Successfully deleted the \`${choice.name}\` role.`).catch(function() {});
		}).catch(() => {
			message.reply(`There was an error attempting to delete the \`${choice.name}\` role.`).catch(function() {});
		});
	} else {
		choice = message.guild.roles.find(role => role.name.toLowerCase().startsWith(content) || content.includes(`${role.id}`));
		if(choice === null) return message.reply("Please specify a valid role.").catch(function() {});
		choice.delete().then(() => {
			message.reply(`Successfully deleted the \`${choice.name}\` role.`).catch(function() {});
		}).catch(() => {
			message.reply(`There was an error attempting to delete the \`${choice.name}\` role.`).catch(function() {});
		});
	}
}
module.exports.help = {
	name: "delrole"
}
