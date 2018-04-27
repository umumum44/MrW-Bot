const Discord = require("discord.js");
async function checkIfDisabled(bot, message, args, cmdname, channels) {
                const nestedMessages = await Promise.all(channels.map(ch => ch.fetchMessages({
                        limit: 100
                })))
                const flatMessages = nestedMessages.reduce((a, b) => a.concat(b))
                const msg = flatMessages.find(msg => msg.content.startsWith(`${message.guild.id} ${cmdname}`))
		if(msg) {
			return(true)
		} else {
			return(false)
		}
}
module.exports.run = async (bot, message, args, prefix, content) => {
         let channels = dbguild.channels.filter(m => RegExp("wbotdisable-database", "gi").test(m.name));
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "about", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
        let name = `${args[0]}`;
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!user) {
                marray = message.guild.members.filter(m => RegExp(name, "gi")
                        .test(m.displayName));
                user = marray.first();
        }
        if (!user) return message.channel.send("Couldn't find this user.")
        let usericon = user.user.avatarURL
        let ab = new Discord.RichEmbed()
                .setTitle("User Information")
                .setColor("#000080")
                .setThumbnail(usericon)
                .addField("Username", user.user.username)
                .addField("Discriminator", user.user.discriminator)
                .addField("User ID", user.user.id)
                .addField("Joined At", user.joinedAt)
                .addField("Registered At", user.user.createdAt);
        return message.channel.send({
                embed: ab
        });
}
module.exports.help = {
        name: "about"
}
