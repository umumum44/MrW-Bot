module.exports.run = async (bot) => {
	bot.user.setActivity(".", { type: "PLAYING" });

	bot.on("guildDelete", () => {
		if (bot.counter) bot.user.setActivity(`${bot.guilds.size} servers`, { type: "WATCHING" });
	});

	bot.on("guildCreate", () => {
		if (bot.counter) bot.user.setActivity(`${bot.guilds.size} servers`, { type: "WATCHING" });
	});
}
