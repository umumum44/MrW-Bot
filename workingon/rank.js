const Discord = require("discord.js");
let dbguild = bot.guilds.get("443929284411654144");
let channels = dbguild.channels.filter(m => RegExp("rank-database", "gi").test(m.name));
async function checkIfDisabled(bot, message, args, commandname, channels) {
		//GUILDID AUTHORID RANK XP
		const nestedMessages = await Promise.all(channels.map(ch => ch.fetchMessages({ limit: 100 })))
		const flatMessages = nestedMessages.reduce((a, b) => a.concat(b))
		const msg = flatMessages.find(msg => msg.content.startsWith(`${message.guild.id} ${persontolookfor.id}`))
		if (!msg) {
			return (false)
		}
		if (msg) {
			var msgarray = msg.content.split(" ");
			return (msgarray)
			}
		}
	}
module.exports.run = async (bot, message, args, prefix, content) => {
	if(!message.mentions.members.first()) {
		//get their rank from databases
	} else {
		//give them their rank
	}
}
module.exports.help = {
        name: "rank"
}
