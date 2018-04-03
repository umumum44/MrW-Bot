const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix) => {
	let name = `${args[0]}`;
	if(!reason) {
		reason = "No reason specified";
	} else {
		reason = message.content.substr(8+prefix.length+args[0].length);
	}
	if(message.member.hasPermission("BAN_MEMBERS")) {
		let buser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!buser) {
			marray = message.guild.members.filter(m => RegExp(name, "gi").test(m.displayName));
			buser = marray.first();
		}
		if (!buser) return message.reply("Couldn't find this user!");
		if (message.member.highestRole.position <= buser.highestRole.position) return message.reply("This user is too high up in this guilds' hierarchy to be banned by you!");
		try {
		buser.send(`You were soft-banned in ${message.guild.name} for \`${reason}\` by ${message.author.username}`).then(() => {
			message.guild.member(buser).ban(7).then(() => {
        message.guild.unban(buser.id);
      	message.react("✅");
    	}).catch(() => {
				message.react("❎");
    	});
		}).catch(() => {
			message.guild.member(buser).ban(7).then(() => {
        message.guild.unban(buser.id);
      	message.react("✅");
      }).catch(() => {
				message.react("❎");
      });
		});
		}
		catch (e) {
			message.reply("Couldn't DM this user to tell them they were softbanned.")
		}
	} else return message.reply("You do not have permission to soft-ban members!");
	return;
}

module.exports.help = {
	name: "softban"
}
