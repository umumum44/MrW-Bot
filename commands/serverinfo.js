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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "serverinfo", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")




    let servericon = message.guild.iconURL;

    let serverinfocmd = new Discord.RichEmbed()

    .setTitle("Server Information")

    .setColor("#95F410")

    .setThumbnail(servericon)

    .addField("Server Name", message.guild.name)

    .addField("Created On", message.guild.createdAt)

    .addField("Member Count", message.guild.memberCount);



    return message.channel.send(serverinfocmd);

  }



module.exports.help = {

    name: "serverinfo"

}
