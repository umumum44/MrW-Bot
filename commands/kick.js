const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
	let name = `${args[0]}`
	let reason = message.content.substr(8+args[0].length);
	if(!reason) reason = "No reason specified";
	if(message.member.hasPermission("KICK_MEMBERS")) {
		let kickeduser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!kickeduser) {
			marray = message.guild.members.filter(m => RegExp(name, "gi").test(m.displayName));
			kickeduser = marray.first();
		}
		if(!kickeduser) return message.reply("Couldn't find this user!")
		if(kickeduser.hasPermission("KICK_MEMBERS")) return message.channel.send(`${message.author}, this member cannot be kicked!`);
		kickeduser.send(`You were kicked in ${message.guild.name} for \`${reason}\` by ${message.author.username}`).then(() => {
			message.guild.member(kickeduser).kick().then(() => {
        			message.react("✅");
      			}).catch(() => {
				message.react("❎");
      			});
		}).catch(() => {
			message.guild.member(kickeduser).kick().then(() => {
        			message.react("✅");
      			}).catch(() => {
				message.react("❎");
      			});
		});
	} else return message.reply("You do not have permission to kick members!");
	return;
}

module.exports.help = {
	name: "kick"
}
