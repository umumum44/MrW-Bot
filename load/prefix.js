module.exports.run = async (bot) => {
	bot.on("message", message => {
		if (message.isMemberMentioned(bot.user) && message.content.endsWith("prefix reset") && message.member.hasPermission("MANAGE_GUILD")) {
			let aaa = dbguild.channels.filter(m => RegExp("wbotprefixes-database", "gi").test(m.name));
			aaa.forEach(chl => {
				chl.fetchMessages({ limit: 100 }).then(msgs => {
					msgs.forEach(msg => {
						if (msg.content.startsWith(`${message.guild.id}`)) {
							msg.delete();
						}
					});
				});
			});
			message.react("\u2705");
		}
	});
}
