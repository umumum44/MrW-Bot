module.exports.run = async (bot, message) => {
	message.channel.send("The test command was executed.");
};
module.exports.help = {
	name: "test",
	description: "Just a test command",
	type: "Miscellaneous"
};
