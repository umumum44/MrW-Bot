const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, content) => {
	var commandsEmbed = new Discord.RichEmbed()
		.setTitle("Commands")
                .setDescription("\`Default Bot Prefix:\` !!");
	const TYPES = ["Public", "Fun", "Information", "Roles", "Moderation", "Miscellaneous"],
		MAP = (command) => `\`${prefix}${command.help.name}\` - ${command.help.description}`;
	TYPES.forEach(type => {
                commandsEmbed.addField(type, bot.allcommands.filter(command => command.help.type === type).map(MAP));
                });
        message.author.send({ embed: commandsEmbed }).then(() => {
                message.react("\u2705").catch(function () {});
         }).catch(() => {
                message.reply("I could not DM you the list of commands! Please check your privacy commands and try again!").catch(function () {});
        });
}
module.exports.help = {
	name: "help",
	description: "Sends you this prompt",
	type: "Public"
};