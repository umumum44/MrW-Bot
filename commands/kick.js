const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
	let name = `${args[0]}`
	let reason = message.content.substr(7+args[0].length);
	if(!reason) reason = "No reason specified";
	if(message.member.hasPermission("KICK_MEMBERS")) {
		let kickeduser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!kickeduser) {
			marray = message.guild.members.filter(m => RegExp(name, "gi").test(m.displayName));
			kickeduser = marray.first();
		}
		if(!kickeduser) return message.reply("Couldn't find this user!")
		//if(kickeduser.hasPermission("KICK_MEMBERS")) return message.channel.send(`${message.author}, this member cannot be kicked!`);
		//message.guild.member(kickeduser).kick();
		kickeduser.send(`You were kicked in ${message.guild.name} for \`${reason}\` by ${message.author.username}`);
		
		message.react("\u2705");
	} else return message.channel.send(`${message.author}, you do not have permission to kick members!`);
	return;
}

module.exports.help = {
	name: "kick"
}
