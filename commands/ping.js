module.exports.run = async (bot, message) => {
	message.reply(`pong! \`${Math.floor(bot.pings[0])}ms\``)
		.catch(function () {});
};
module.exports.help = {
	name: "ping",
	description: "Responds with the speed of the bot",
	type: "Miscellaneous"
};
