const Discord = require("discord.js");
module.exports.run = async (bot, message) => {
	var emojis = message.guild.emojis.array();
	if (!emojis || emojis === []) return message.reply("There are no emojis in this server!");
	if (emojis.length > 1) {
		var page = 1;
		var totalpages = emojis.length;
		var embed = new Discord.RichEmbed()
			.setTitle("Emojis")
			.setDescription(`:${emojis[page - 1].name}:`)
			.setImage(emojis[page - 1].url)
			.setFooter(`Page ${page}/${totalpages} | Emoji ID: ${emojis[page - 1].id}`)
			.setColor("BLUE");
		message.channel.send(embed).then(async function (sentEmbed) {
			const emojiArray = ["◀", "▶"];
			const filter = (reaction, user) => emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
			await sentEmbed.react(emojiArray[0]).catch(function () { });
			await sentEmbed.react(emojiArray[1]).catch(function () { });
			var reactions = sentEmbed.createReactionCollector(filter, {
				time: 300000
			});
			reactions.on("collect", async function (reaction) {
				await reaction.remove(message.author);
				if (reaction.emoji.name === "◀") {
					if (page !== 1) {
						page = page - 1;
					} else {
						page = totalpages;
					}
				} else {
					if (page !== totalpages) {
						page = page + 1;
					} else {
						page = 1;
					}
				}
				embed = new Discord.RichEmbed()
					.setTitle("Emojis")
					.setDescription(`:${emojis[page - 1].name}:`)
					.setImage(emojis[page - 1].url)
					.setFooter(`Page ${page}/${totalpages} | Emoji ID: ${emojis[page - 1].id}`)
					.setColor("BLUE");
				sentEmbed.edit(embed).catch(function () { });
			});
			reactions.on("end", () => sentEmbed.edit("Interactive command ended: 5 minutes passed."));
		}).catch(() => {
			message.reply("There was an error while trying to send this embed.").catch(() => {
				message.author.send(`You attempted to run the \`emojis\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		});
	} else {
		let emojiembed = new Discord.RichEmbed()
			.setTitle("Emojis")
			.setDescription(`:${emojis[0].name}:`)
			.setImage(emojis[0].url)
			.setFooter(`Page ${1}/${1} | Emoji ID: ${emojis[0].id}`)
			.setColor("BLUE");
		message.channel.send(emojiembed);
	}
};
module.exports.help = {
	name: "emojis",
	description: "Lists the server's current emojis",
	type: "Information"
};
