module.exports.run = async (bot) => {
	var achannels = bot.guilds.get("443929284411654144").channels.filter(m => RegExp("wbotprefixes-database", "gi").test(m.name));
	const nestedMessages = await Promise.all(achannels.map(ch => ch.fetchMessages({ limit: 100 })));
	const flatMessages = nestedMessages.reduce((a, b) => a.concat(b))
	flatMessages.forEach(msg => {
		var guild = msg.content.split(" ")[0];
		var prefix = msg.content.split(" ")[1];
		bot.databases.prefix.push({ guild: guild, prefix: prefix });
	});
}
