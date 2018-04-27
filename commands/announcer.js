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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "announcer", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
	if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have permission to use this command!")
	if(!args[0]) return message.reply("You did not supply the correct parameters! \n`!!announcer (toggle/channel/avatar/footer/joinmessage/leavemessage/reset) (-/#channel/-/-/message/message/-)`\n*Note - `-`'s represent something that doesn't need another parameter*") 
	var announcerchannel = bot.channels.find(`id`, `439179955646234624`);
        var announcermsgs = await announcerchannel.fetchMessages({
                        limit: 100
                })
        var announcermsg = announcermsgs.find(m => m.content.startsWith(message.guild.id));
	if(announcermsg) {
	//guildid | toggle | channel | avatar | footer | hellomsg | goodbyemsg
	var settings = announcermsg.content;
	var togglesetting = settings.split("|")[1].trim() || "false";
      	var channelsetting = settings.split("|")[2].trim() || "none";
	var avatarsetting = settings.split("|")[3].trim() || "false";
	var footersetting = settings.split("|")[4].trim() || "false";
	var hellomsg = settings.split("|")[5].trim() || "none";
	var byemsg = settings.split("|")[6].trim() || "none";
		//execute if msg
		if(args[0].toLowerCase() === "toggle") {
                if(togglesetting === "true") {
			await announcermsg.edit(`${message.guild.id} | false | ${channelsetting} | ${avatarsetting} | ${footersetting} | ${hellomsg} | ${byemsg}`)
			return await message.reply("I have `disabled` join/leave messages!")
        } else if (togglesetting === "false") {
		await announcermsg.edit(`${message.guild.id} | true | ${channelsetting} | ${avatarsetting} | ${footersetting} | ${hellomsg} | ${byemsg}`)
			return await message.reply("I have `enabled` join/leave messages!")
	}
		} else if(args[0].toLowerCase() === "channel") {
			if(message.mentions.channels.first().id) {
			await announcermsg.edit(`${message.guild.id} | ${togglesetting} | ${message.mentions.channels.first().id} | ${avatarsetting} | ${footersetting} | ${hellomsg} | ${byemsg}`)
				return message.reply(`Set join/leave messages to <#${message.mentions.channels.first().id}>!`)
			} else {
				return message.reply("Please **mention** a valid channel!")
			}
		} else if(args[0].toLowerCase() === "avatar") {
			if(avatarsetting === "true") {
			await announcermsg.edit(`${message.guild.id} | ${togglesetting} | ${channelsetting} | false | ${footersetting} | ${hellomsg} | ${byemsg}`)
			return await message.reply("I have `disabled` avatars on join/leave messages!")
        } else if (avatarsetting === "false") {
		await announcermsg.edit(`${message.guild.id} | ${togglesetting} | ${channelsetting} | true | ${footersetting} | ${hellomsg} | ${byemsg}`)
			return await message.reply("I have `enabled` avatars on join/leave messages!")
	}

	} else if(args[0].toLowerCase() === "footer") {
			if(footersetting === "true") {
			await announcermsg.edit(`${message.guild.id} | ${togglesetting} | ${channelsetting} | ${avatarsetting} | false | ${hellomsg} | ${byemsg}`)
			return await message.reply("I have `disabled` footers on join/leave messages!")
        } else if (footersetting === "false") {
		await announcermsg.edit(`${message.guild.id} | ${togglesetting} | ${channelsetting} | ${avatarsetting} | true | ${hellomsg} | ${byemsg}`)
			return await message.reply("I have `enabled` footers on join/leave messages!")
	}

	} else if(args[0].toLowerCase() === "joinmessage") {
			if(content.length <= 250) {
			await announcermsg.edit(`${message.guild.id} | ${togglesetting} | ${channelsetting} | ${avatarsetting} | ${footersetting} | ${content.slice(args[0].length)} | ${byemsg}`)
				return await message.reply("Join message was edited!")
		} else {
			message.reply("Your join message cannot be more than 250 characters!")
		}
		} else if(args[0].toLowerCase() === "leavemessage") {
			if(content.length <= 250) {
			await announcermsg.edit(`${message.guild.id} | ${togglesetting} | ${channelsetting} | ${avatarsetting} | ${footersetting} | ${hellomsg} | ${content.slice(args[0].length)}`)
				 return await message.reply("Leave message was edited!")
		} else {
			return await message.reply("Your leave message cannot be more than 250 characters!")
		}
		} else if(args[0].toLowerCase() === "reset") {
			await announcermsg.delete()
			return await message.reply("Erased your join/leave message settings!")
		} else {
		return await message.reply("You did not supply the correct parameters! \n`!!announcer (toggle/channel/avatar/footer/joinmessage/leavemessage/reset) (-/#channel/-/-/message/message/-)`\n*Note - `-`'s represent something that doesn't need another parameter*") 
		}
		//execute if no msg
	} else if(!announcermsg) {
	var togglesetting = "false"
      	var channelsetting = "none"
	var avatarsetting = "false"
	var footersetting = "false"
	var hellomsg = "none"
	var byemsg = "none"
		
        if(args[0].toLowerCase() === "toggle") {
		await announcerchannel.send(`${message.guild.id} | true | ${channelsetting} | ${avatarsetting} | ${footersetting} | ${hellomsg} | ${byemsg}`)
			return await message.reply("I have `enabled` join/leave messages!")
	} else if(args[0].toLowerCase() === "channel") {
			if(message.mentions.channels.first().id) {
			await announcerchannel.send(`${message.guild.id} | ${togglesetting} | ${message.mentions.channels.first().id} | ${avatarsetting} | ${footersetting} | ${hellomsg} | ${byemsg}`)
				return message.reply(`Set join/leave messages to <#${message.mentions.channels.first().id}>!`)
			} else {
				return message.reply("Please **mention** a valid channel!")
			}
		} else if(args[0].toLowerCase() === "avatar") {
		await announcerchannel.send(`${message.guild.id} | ${togglesetting} | ${channelsetting} | true | ${footersetting} | ${hellomsg} | ${byemsg}`)
			return await message.reply("I have `enabled` avatars on join/leave messages!")

	} else if(args[0].toLowerCase() === "footer") {
		await announcerchannel.send(`${message.guild.id} | ${togglesetting} | ${channelsetting} | ${avatarsetting} | true | ${hellomsg} | ${byemsg}`)
			return await message.reply("I have `enabled` footers on join/leave messages!")

	} else if(args[0].toLowerCase() === "joinmessage") {
			if(content.length <= 250) {
			await announcerchannel.send(`${message.guild.id} | ${togglesetting} | ${channelsetting} | ${avatarsetting} | ${footersetting} | ${content.slice(args[0].length)} | ${byemsg}`)
				return await message.reply("Join message was edited!")
		} else {
			message.reply("Your join message cannot be more than 250 characters!")
		}
		} else if(args[0].toLowerCase() === "leavemessage") {
			if(content.length <= 250) {
			await announcerchannel.send(`${message.guild.id} | ${togglesetting} | ${channelsetting} | ${avatarsetting} | ${footersetting} | ${hellomsg} | ${content.slice(args[0].length)}`)
				return await message.reply("Leave message was edited!")
		} else {
			await message.reply("Your leave message cannot be more than 250 characters!")
		}
		} else if(args[0].toLowerCase() === "reset") {
			return await message.reply("Erased your join/leave message settings!")
		}
                 
	} else {
		return await message.reply("You did not supply the correct parameters! \n`!!announcer (toggle/channel/avatar/footer/joinmessage/leavemessage/reset) (-/#channel/-/-/message/message/-)`\n*Note - `-`'s represent something that doesn't need another parameter*") 
		}
		

                

}
module.exports.help = {
        name: "announcer"
}
