module.exports.run = async (bot, message) => {
	let guild = bot.guilds.find("id", "410400562232819723");
	let member = await guild.fetchMember(message.author.id);
	if (!member) return;
	if (member.roles.get("410481036162760722")) {
		if (bot.counter === false) {
			bot.user.setActivity(`${bot.guilds.size} servers`, {
				type: "WATCHING"
			});
			message.react("\u2705");
			bot.counter = true;
		} else if (bot.counter === true) {
			bot.user.setActivity("Games", {
				type: "PLAYING"
			});
			message.react("\u2705");
			bot.counter = false;
		}
	}
};
module.exports.help = {
	name: "countstatus",
	description: "Sets the bot's server count to the number of servers",
	type: "Restricted"
};
