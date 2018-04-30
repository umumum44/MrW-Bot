var randomHex = require('random-hex');
const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, content) => {
	var hex = randomHex.generate();
	const embed = new Discord.RichEmbed()
		.setTitle("Random Color")
		.setColor(hex)
		.setFooter(`Requested by ${message.author.tag}`)
		.setDescription(`Hex Code: ${hex}`);
	message.channel.send(embed).catch(function() {});	
}
module.exports.help = {
        name: "randomcolor"
}
