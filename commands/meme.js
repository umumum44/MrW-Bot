const getMemeUrls = require('get-meme-urls');
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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "meme", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
        let sq = content
        if (!sq) return message.reply("You must provide something to search with!")
        let ind = Math.floor(Math.random() * 400);
        let ps = 25
        let inde = Math.floor(Math.random() * 50);
        let pp = await new Promise((resolve, reject) => {
                getMemeUrls(sq, {
                                pageSize: 25
                                , pageIndex: ind
                        })
                        .then(result => {
                                if (result[0]) {
                                        var meme = result[Math.floor(Math.random() * result.length)];
                                        message.reply(meme)
                                        resolve(true);
                                } else {
                                        resolve(false);
                                }
                        })
                        .catch(err => {
                                console.log(err)
                        });
        })
        if (pp === true) return;
        getMemeUrls(sq, {
                        pageSize: 25
                        , pageIndex: inde
                })
                .then(resulto => {
                        if (!resulto[0]) {
                                return message.reply("Couldn't find memes with this name!")
                        }
                        var memeo = resulto[Math.floor(Math.random() * resulto.length)];
                        message.reply(memeo)
                })
                .catch(err => {
                        console.log(err)
                });
}
module.exports.help = {
        name: "meme"
}
