const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let name = `${args[0]}`;
	let you = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!you) {
		marray = message.guild.members.filter(m => RegExp(name, "gi").test(m.displayName));
		you = marray.first();
		}
	return message.channel.send(you.user.displayAvatarURL);

}
module.exports.help = {
	name: "avatar"
}
