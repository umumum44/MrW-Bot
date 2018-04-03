const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix) => {
	let name = `${args[0]}`;
	var reason;
	if(!reason) {
		reason = "No reason specified";
	} else {
		reason = message.content.substr(4+prefix.length+args[0].length);
	}
	if(message.member.hasPermission("BAN_MEMBERS")) {
		let buser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!buser) {
			marray = message.guild.members.filter(m => RegExp(name, "gi").test(m.displayName));
			buser = marray.first();
		}
		if(!buser) return message.reply("Couldn't find that user!")
		if(message.member.highestRole.position <= buser.highestRole.position) return message.reply("This user is too high up in this guilds' hierarchy to be banned by you!");
		try {
		buser.send(`You were banned in ${message.guild.name} for \`${reason}\` by ${message.author.username}`).then(() => {
			message.guild.member(buser).ban().then(() => {
        			message.react("✅");
      			}).catch(() => {
				message.react("❎");
      			});
		}).catch(() => {
			message.guild.member(buser).ban().then(() => {
        			message.react("✅");
      			}).catch(() => {
				message.react("❎");
      			});
		});
		}
		catch (e) {
			message.reply("I couldn't DM this user that they were banned.")
		}

	} else return message.reply("You do not have permission to ban members!");
	return;
}

module.exports.help = {
	name: "ban"
}
