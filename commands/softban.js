module.exports.run = async (bot, message, args, prefix, content) => {
	const rawContent = content;
	const parameterOne = args[0];
	const parameterTwo = args[1];
	if (message.member.hasPermission("BAN_MEMBERS")) {
		const target = message.guild.members.find(m => parameterOne.includes(`${m.user.id}`));
		if (target !== null) {
			if (message.member.highestRole.position > target.highestRole.position) {
				var reason;
				if (parameterTwo != undefined) {
					reason = "`" + rawContent.substr(parameterOne.length + 1) + "`";
				} else {
					reason = "`No reason specified.`";
				}
				if (target.bannable) {
					target.send(`You have been softbanned/kicked from the \`${message.guild.name}\` server by \`${message.author.tag}\` for ${reason}`)
						.then(() => {
							target.ban({
								days: 7,
								reason: `Softbanned by ${message.author.tag} for ${reason}`
							}).then(() => {
								message.guild.unban(target.user, `Softbanned by ${message.author.tag} for ${reason}`).then(() => {
									message.channel.send(`***Successfully softbanned \`${target.user.tag}\`.***`)
										.then(msg => msg.delete(5000)
											.catch(function() {})).catch(function() {});
								}).catch(() => {
									message.reply(`Failed to unban \`${target.user.tag}\`.`)
										.then(msg => msg.delete(5000).catch(function() {}))
										.catch(function() {});
								});
							}).catch(() => {
								message.channel.send(`Failed to ban \`${target.user.tag}\`.`)
									.then(msg => msg.delete(5000).catch(function() {}))
									.catch(function() {});
							});
						}).catch(() => {
							target.ban({
								days: 7,
								reason: `Banned by ${message.author.tag} for ${reason}`
							}).then(() => {
								message.guild.unban({
									user: target.user,
									reason: `Softbanned by ${message.author.tag} for ${reason}`
								}).then(() => {
									message.channel.send(`***Successfully softbanned \`${target.user.tag}\`.***`)
										.then(msg => msg.delete(5000)
											.catch(function() {}));
								}).catch(() => {
									message.reply(`Failed to unban \`${target.user.tag}\`.`)
										.then(msg => msg.delete(5000).catch(function() {}))
										.catch(function() {});
								});
							}).catch(() => {
								message.channel.send(`Failed to ban \`${target.user.tag}\`.`)
									.then(msg => msg.delete(5000).catch(function() {}))
									.catch(function() {});
							});
						});
				} else {
					message.reply("I do not have permission to ban this user.").catch(() => {
						message.author.send(`You attempted to use the \`ban\` command in ${message.channel}, but I can not chat there.`)
							.catch(function() {});
					});
				}
			} else {
				message.reply("That user is too far up in this guild's hierarchy to be banned by you.").catch(() => {
					message.author.send(`You attempted to use the \`ban\` command in ${message.channel}, but I can not chat there.`).catch(function() {});
				});
			}
		} else {
			message.reply("Please mention or supply the id of a valid user.").catch(() => {
				message.author.send(`You attempted to use the \`ban\` command in ${message.channel}, but I can not chat there.`).catch(function() {});
			});
		}
	} else {
		message.reply("You do not have permissions to trigger this command.").catch(() => {
			message.author.send(`You attempted to use the \`ban\` command in ${message.channel}, but I can not chat there.`).catch(function() {});
		});
	}
}
