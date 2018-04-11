const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	if(args[0] === undefined) return message.reply("Please specify the following params (required). `!delrole (role name)`.");
	var choice;
	if(message.content.substr(8).length < 5) {
		choice = message.guild.roles.find(role => role.name.toLowerCase() === message.content.substr(8).toLowerCase());
		if(choice === null) return message.reply("For safety reasons, please supply a role name greater than five characters. If the full role name is 5 or less characters, mimic the role name letter for letter.").catch(function() {});
		choice.delete().then(() => {
			message.reply(`Successfully deleted the \`${choice.name}\` role.`).catch(function() {});
		}).catch(() => {
			message.reply(`There was an error attempting to delete the \`${choice.name}\` role.`).catch(function() {});
		});
	} else {
		choice = message.guild.roles.find(role => role.name.toLowerCase().startsWith(message.content.substr(8).toLowerCase()) || args[0].includes(`${role.id}`));
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
