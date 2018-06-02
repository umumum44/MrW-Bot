const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, content) => {
	var embed = new Discord.RichEmbed().setTitle("Emojis").setColor("BLUE");
	var emojis = message.guild.emojis.array().map(u => `:${u.name}:`).join("\n");
	if (!emojis || emojis === []) return message.reply("There are no emojis in this server!");
	var emojisLength = emojis.length;
	var emojisToSend;
	var page = 1;
	if (emojis.split("\n").length > 3) {
		emojisLength = 0;
		emojisToSend = emojis.split("\n").slice(emojisLength, emojisLength + 3);
		var totalPages = 3 - (emojis.split("\n").length % 3);
		if (totalPages === 3) {
			totalPages = emojis.split("\n").length / 3;
		} else {
			totalPages = (emojis.split("\n").length + (3 - (emojis.split("\n").length % 3)));
			totalPages = totalPages / 3;
		}
		embed.setDescription(emojisToSend.join("\n")).setFooter(`Page ${page}/${totalPages}`);
		message.channel.send({
			embed: embed
		}).then(async function (sentEmbed) {
			const emojiArray = ["◀", "▶"];
			const filter = (reaction, user) => emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;
			await sentEmbed.react(emojiArray[0]).catch(function () { });
			await sentEmbed.react(emojiArray[1]).catch(function () { });
			var reactions = sentEmbed.createReactionCollector(filter, {
				time: 13000
			});
			reactions.on("collect", async function (reaction) {
				await reaction.remove(message.author);
				if (reaction.emoji.name === "◀") {
					if (page !== 1) {
						page = page - 1;
						emojisLength = emojisLength - 3;
						emojisToSend = emojis.split("\n").slice(emojisLength, emojisLength + 3);
					}
				} else {
					if (page !== totalPages) {
						page = page + 1;
						emojisLength = emojisLength + 3;
						emojisToSend = emojis.split("\n").slice(emojisLength, emojisLength + 3);
					}
				}
				embed = new Discord.RichEmbed().setDescription(emojisToSend.join("\n")).setColor("ORANGE")
					.setFooter(`Page ${page}/${totalPages}`);
				if (content !== "") embed.setTitle(`Users in ${message.guild.roles.find(r => r.name.toLowerCase().startsWith(content.toLowerCase())).name}`);
				if (content === "") embed.setTitle("Users");
				sentEmbed.edit(embed).catch(function () { });
			});
			reactions.on("end", () => sentEmbed.edit("Interactive command ended: 2 minutes passed."));
		}).catch(() => {
			message.reply("There was an error while trying to send this embed.").catch(() => {
				message.author.send(`You attempted to run the \`emojis\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		});
	} else {
		embed.setDescription(emojis);
		message.channel.send(embed).catch(() => {
			message.reply("There was an error while trying to send this embed.").catch(() => {
				message.author.send(`You attempted to run the \`emojis\` command in ${message.channel}, but I can not chat there.`).catch(function () { });
			});
		});
	}
};
module.exports.help = {
	name: "emojis",
	description: "Lists the server's current emojis",
	type: "Information"
};
