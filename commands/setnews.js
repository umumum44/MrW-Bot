module.exports.run = async (bot, message, args, prefix) => {
	let guild = bot.guilds.find(`id`, "410400562232819723")
let member = await guild.fetchMember(message.author.id)
if(!member) return;
//if (member.roles.get("400511217061330955")) { //owner 
  let update = message.content.substr(prefix.length + 8);

let channel = bot.channels.find(`id`, "430477691154595852")
let editor = await channel.fetchMessage("430478034160713728")
await editor.edit(update)
await message.react("\u2705")


//}


}
module.exports.help = {
	name: "setnews"
}
