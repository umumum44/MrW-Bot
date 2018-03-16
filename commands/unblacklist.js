const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
	if(message.author.id === "399975738008141824" || message.author.id === "303683211790254080" || message.author.id === "245877990938902529" || message.author.id === "289380085025472523") {

      let channel = bot.channels.find(`id`, "424006591411519499")
      let pingeduser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	let userid = args[0]
	let messages = await channel.fetchMessages({ limit: 100 })

      if(!pingeduser) {
      	      let barray = messages.filter(m => RegExp(userid, "gi").test(m.content));
	      let auser = barray.first();
	      if(auser) {
		     auser.delete()
		     message.react("\u2705")
	      } else return message.reply("This user is not blacklisted!")
      } else {
      	      let darray = messages.filter(m => RegExp(pingeduser.id, "gi").test(m.content));
	      let buser = darray.first();
	if(buser) { 
		buser.delete()
		message.react("\u2705")
	} else return message.reply("This user is not blacklisted!")
}
	
}

}

module.exports.help = {
	name: "unblacklist"
}
