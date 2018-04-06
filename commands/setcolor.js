module.exports.run = async (bot, message, args) => {
let guild = bot.guilds.find(`id`, "410400562232819723")
let member = await guild.fetchMember(message.author.id)
if(!member) return;
if  (member.roles.get("410608939139334184") //coowner
 || member.roles.get("410481036162760722")) { //owner 
        let tbh = args.join(" ");
                await bot.user.setStatus(tbh);
                message.react("\u2705");
}




}

module.exports.help = {
	name: "setcolor"
}
