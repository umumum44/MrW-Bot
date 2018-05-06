const Discord = require("discord.js");

module.exports.run = async (bot) => {
	bot.on("messageDelete", (message) => {
		var messageAttachments = "";
		if (message.attachments.first() !== undefined) messageAttachments = `\n${message.attachments.first().url}`;
		if (message.content !== "" || messageAttachments !== "") {
			var logsDatabase = bot.channels.get("440238037201453056");
			logsDatabase.fetchMessages({ limit: 100 }).then(messages => {
				messages.forEach(msg => {
					var logChannel = bot.channels.get(msg.content.split(" ")[1]);
					if (logChannel == undefined) return msg.delete();
					var logGuild = logChannel.guild;
					if (logGuild == undefined) return msg.delete();
					if (logGuild.id === msg.guild.id) {
						const messageDeleteEmbed = new Discord.RichEmbed()
              .setTitle("Message Delete")
              .setColor("RED")
              .addField("Message Content", `Message ID: \`${message.id}\`\nMessage author: ${message.author}\nMessage channel: ${message.channel}\nCreated at: \`${message.createdAt}\`\nDeleted at: \`${Date.now().getDate()}\``)
              .setDescription(`\`\`\`${message.content}${messageAttachments}\`\`\``);
            logChannel.send({ embed: messageDeleteEmbed }).catch(function() {});
					}
				});
			});
		}
	});
	bot.on("messageUpdate", (messages) => {
		var oldmessage = messages.oldMessage
		var newmessage = messages.newMessage
		var omessageAttachments = "";
		var nmessageAttachments = "";
		if (oldmessage.attachments.first() !== undefined) omessageAttachments = `\n${oldmessage.attachments.first().url}`;
		if (oldmessage.content !== "" || omessageAttachments !== "") {
			var logsDatabase = bot.channels.get("440238037201453056");
			logsDatabase.fetchMessages({ limit: 100 }).then(messages => {
				messages.forEach(msg => {
					var logChannel = bot.channels.get(msg.content.split(" ")[1]);
					if (logChannel == undefined) return msg.delete();
					var logGuild = logChannel.guild;
					if (logGuild == undefined) return msg.delete();
					if (logGuild.id === msg.guild.id) {
						const messageDeleteEmbed = new Discord.RichEmbed()
              .setTitle("Message Edit")
              .setColor("RED")
              .addField("Message Information", `Message ID: \`${newmessage.id}\`\nMessage author: ${newmessage.author}\nMessage channel: ${newmessage.channel}\nCreated at: \`${newmessage.createdAt}\``)
              .setDescription(`**Old Message:**\`\`\`${oldmessage.content}${omessageAttachments}\`\`\`\n**New Message:**\`\`\`${newmessage.content}${nmessageAttachments}\`\`\``);
            logChannel.send({ embed: messageDeleteEmbed }).catch(function() {});
					}
				});
			});
		}
	});
}
