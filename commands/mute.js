const Discord = require("discord.js");
const ms = require("ms");
module.exports.run = async (bot, message, args, prefix) => {
	if(message.member.hasPermission("KICK_MEMBERS")) {
		let name = `${args[0]}`;
		let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		if(!tomute) {
			marray = message.guild.members.filter(m => RegExp(name, "gi").test(m.displayName));
			tomute = marray.first();
		}
		if(!tomute) return message.reply("Couldn't find this user!");
		if(message.member.highestRole.position <= tomute.member.highestRole.position) return message.reply("This user is too high up in this guilds' hierarchy to be muted by you!");
		let muterole = message.guild.roles.find(`name`, "Muted");
		if(!muterole) {
			try {
				muterole = await message.guild.createRole({
					name: "Muted",
					color: "#6699cc",
					permissions: []
				})
				message.guild.channels.forEach(async (channel, id) => {
					await channel.overwritePermissions(muterole, {
						SEND_MESSAGES: false,
						ADD_REACTIONS: false
					});
				});
			} catch(e) {
				console.log(e.stack);
			}}
		if(tomute.roles.has(muterole.id)) {
			return message.reply("This user is already muted!");
		} else {
			let mutetime = args[1];
			if(!mutetime) return message.reply("You must specify a time!");
			await(tomute.addRole(muterole.id));
			let reason = message.content.substr(5+prefix.length+args[0].length+args[1].length);
			if(!reason) reason = "No reason specified";
			tomute.send(`You were muted in ${message.guild.name} for \`${reason}\` for \`${mutetime}\` by ${message.author.username}`);
			message.react("\u2705");
			setTimeout(function(){
				tomute.removeRole(muterole.id);
			}, ms(mutetime));
		}
	}
}
module.exports.help = {
	name: "mute"
}
