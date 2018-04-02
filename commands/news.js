const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {

let channel = bot.channels.find(`id`, "430477691154595852")
let editor = await channel.fetchMessage("430478034160713728")
let thing = new Discord.RichEmbed()
	.setTitle("News")
 .setColor("#FF0000")
 .setDescription(editor.content)
.setFooter(`Requested by ${message.author.tag}`)
 await message.channel.send(thing)

}



module.exports.help = {
	name: "news"
}
