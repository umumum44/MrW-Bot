async function checkIfDisabled(bot, message, args, cmdname, channels) {
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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "afk", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
        let afkmsg = args.join(" ");
        if (!afkmsg) afkmsg = "No reason provided.";
        let channel = bot.channels.find(`id`, "422201325623836682");
        channel.send(`${message.author.id} ${afkmsg}`);
        message.reply(`You are now AFK!!!: \`${afkmsg}\`\nTo become un-AFK, just talk again!!`);
        message.delete()
}
module.exports.help = {
        name: "afk"
}
