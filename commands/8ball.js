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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "8ball", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
        var responses = [" no.", " highly unlikely.", " very doubtful.", " you wish.", " don't count on it", " probably.", " most definitely", " yes.", " highly likely.", " of course."
             , " ask again later.", " outlook not so good, retry.", " ask again later.", " better not tell you now."];
        var randomchoice = Math.floor(Math.random() * responses.length);
        message.reply("The 8ball says... " + "" + responses[randomchoice] + "");
}
module.exports.help = {
        name: "8ball"
}
