const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	       
	const rawContent = args.join(" ");
	const parameterOne = rawContent.split(" ")[0];
	const parameterTwo = rawContent.split(" ")[1];
	if (message.member.hasPermission("KICK_MEMBERS")) {
		const target = message.guild.members.find(m => parameterOne.includes(`${m.user.id}`));
		if (target !== null) {
			if (message.member.highestRole.position > target.highestRole.position) {
				var reason;
				if (parameterTwo != undefined) {
					reason = "`" + rawContent.substr(parameterOne.length + 1) + "`";
				} else {
					reason = "`No reason specified.`";
				}
				if (target.kickable) {
					target.send(`You have been kicked from the \`${message.guild.name}\` server by \`${message.author.tag}\` for ${reason}`).then(() => {
						target.kick(`Kicked by ${message.author.tag} for ${reason}`).then(() => {
							message.channel.send(`***Successfully kicked \`${target.user.tag}\`.***`).catch(function() {});
						}).catch(() => {
							message.channel.send(`Failed to kick \`${target.user.tag}\`.`).catch(function() {});
						});
					}).catch(() => {
						target.kick(`Kicked by ${message.author.tag} for ${reason}`).then(() => {
							message.channel.send(`***Successfully kicked \`${target.user.tag}\`.***`).catch(function() {});
						}).catch(() => {
							message.channel.send(`Failed to kick \`${target.user.tag}\`.`).catch(function() {});
						});
					});
				} else {
					message.reply("I do not have permission to kick this user.").catch(() => {
						message.author.send(`You attempted to use the \`kick\` command in ${message.channel}, but I can not chat there.`)
							.catch(function() {});
					});
				}
			} else {
				message.reply("That user is too far up in this guild's hierarchy to be kicked by you.").catch(() => {
					message.author.send(`You attempted to use the \`kick\` command in ${message.channel}, but I can not chat there.`).catch(function() {});
				});
			}
		} else {
			message.reply("Please mention or supply the id of a valid user.").catch(() => {
				message.author.send(`You attempted to use the \`kick\` command in ${message.channel}, but I can not chat there.`).catch(function() {});
			});
		}
	} else {
		message.reply("You do not have permissions to trigger this command.").catch(() => {
			message.author.send(`You attempted to use the \`kick\` command in ${message.channel}, but I can not chat there.`).catch(function() {});
		});
	}
}
module.exports.help = {
	name: "kick"
}
