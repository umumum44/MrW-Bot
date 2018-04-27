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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "rps", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
	let choice = args[0];
	var responses = ["rock", "paper", "scissors"];
	if (!choice) return message.reply("You did not provide your choice!")
	if (!responses.includes(choice.toLowerCase())) return message.reply("Please specify one of the following as a choice: `rock`, `paper` or `scissors`.");
	var responsesop = ["paper", "scissors", "rock"];
	var randomchoice = Math.floor(Math.random() * responses.length);
	if (choice.toLowerCase() == responses[randomchoice]) return message.reply(`You choice \`${choice}\`, I chose \`${responses[randomchoice]}\`! It's a draw!`);
	if (responsesop.indexOf(choice) == randomchoice) return message.reply(`You choice \`${choice}\`, I chose \`${responses[randomchoice]}\`! You win!`);
	if (responsesop.indexOf(choice) != randomchoice) return message.reply(`You choice \`${choice}\`, I chose \`${responses[randomchoice]}\`! You lose!`);

}
module.exports.help = {
	name: "rps"
}
