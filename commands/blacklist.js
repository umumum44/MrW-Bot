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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "blacklist", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
        let guild = bot.guilds.find(`id`, "410400562232819723")
        let member = await guild.fetchMember(message.author.id)
        if (!member) return;
        if (member.roles.get("410546480307503124") //mod
                || member.roles.get("410611296401358848") //admin
                || member.roles.get("410608939139334184") //coowner
                || member.roles.get("410481036162760722")) { //owner 
                let channel = bot.channels.find(`id`, "424006591411519499")
                let pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
                let userid = args[0]
                let messages = await channel.fetchMessages({
                        limit: 100
                })
                if (!pingeduser) {
                        let barray = messages.filter(m => RegExp(userid, "gi")
                                .test(m.content));
                        let auser = barray.first();
                        if (!auser) {
                                let userob = await bot.fetchUser(userid)
                                if (!userob) return message.reply("Couldn't find this user!")
                                channel.send(`${userid}, ${userob.username}#${userob.discriminator}`)
                                message.react("\u2705")
                        } else return message.reply("This user is already blacklisted!")
                } else {
                        let darray = messages.filter(m => RegExp(pingeduser.id, "gi")
                                .test(m.content));
                        let buser = darray.first();
                        if (!buser) {
                                let userob = await bot.fetchUser(pingeduser.id)
                                if (!userob) message.reply("Couldn't find this user!")
                                channel.send(`${pingeduser.id}, ${userob.username}#${userob.discriminator}`)
                                message.react("\u2705")
                        } else return message.reply("This user is already blacklisted!")
                }
        }
}
module.exports.help = {
        name: "blacklist"
}
