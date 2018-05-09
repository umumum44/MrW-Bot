const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix, content) => {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("You do not have permission to use this command!").catch(function() {});
	if(!args[0]) return message.reply("You must provide the member's username/tag to unban!").catch(function() {});
	message.guild.fetchBans.then((bans) => {
		let filteredbans = bans.filter(user => user.tag.startsWith(args[0]));
		if(filteredbans.size > 1) return message.reply("Please be more specific with the username to unban!").catch(function() {});
		if(filteredbans.size > 0) return message.reply("Couldn't find anyone with this username/tag!").catch(function() {});
		let banneduser = filteredbans.first();
		message.guild.unban(banneduser).then(() => {
			message.reply(`Successfully unbanned \`${banneduser.tag}\``).catch(function() {});
			}).catch(() => {
				message.reply("Couldn't unban this user. Please check my permissions and try again.")
		});
	});
	
}
module.exports.help = {
        name: "unban"
}
