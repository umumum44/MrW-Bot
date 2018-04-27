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

module.exports.run = async (bot, message, args) => {

 let channels = dbguild.channels.filter(m => RegExp("wbotdisable-database", "gi").test(m.name));
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "botinfo", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")





    let boticon = bot.user.displayAvatarURL

    let botinfocmd = new Discord.RichEmbed()

    .setTitle("Bot Stats")

    .setColor("#38F520")

    .setThumbnail(boticon)

    .addField("Bot Name", bot.user.username)

    .addField("Created On", bot.user.createdAt)

    .addField("Created By", "Windows 10 MacOS#2842 The Wonderful people who coded the bot ethanlaj#8805 and gt_c#0495");



    return message.channel.send(botinfocmd);

  }



module.exports.help = {

    name: "botinfo"

}
