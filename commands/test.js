const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {



    message.channel.send("The test command was executed.")



}

module.exports.help = {
    name: "test",
	description: "Sends you this prompt",
	type: "Public"
}
