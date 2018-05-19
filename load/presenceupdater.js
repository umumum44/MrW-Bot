module.exports.run = async (bot) => {
	bot.user.setActivity("IDK", { type: "PLAYING" });

	bot.on("guildDelete", () => {
		if (bot.counter) bot.user.setActivity(`${bot.guilds.size} servers`, { type: "WATCHING" });
	});

	bot.on("guildCreate", () => {
		if (bot.counter) bot.user.setActivity(`${bot.guilds.size} servers`, { type: "WATCHING" });
	});
}
