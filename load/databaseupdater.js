module.exports.run = async (bot) => {
  var achannels = bot.guilds.get("443929284411654144").channels.filter(m => RegExp("wbotprefixes-database", "gi").test(m.name));
	const nestedMessages = await Promise.all(achannels.map(ch => ch.fetchMessages({ limit: 100 })));
	const flatMessages = nestedMessages.reduce((a, b) => a.concat(b))
	flatMessages.forEach(msg => {
    var commands = msg.content.split(" ");
    var guild = commands.shift();
    bot.databases.disabled.push({ guild: guild, commands: commands });
  });
}
