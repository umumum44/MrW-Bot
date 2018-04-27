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
	let cmddisablecheck = await checkIfDisabled(bot, message, args, "removewarn", channels)
	if(cmddisablecheck) return message.reply("This command has been disabled by a server manager!")
  let target = message.guild.member(message.mentions.users.first());
  if (target) {
    if(message.member.hasPermission("KICK_MEMBERS") || message.member.hasPermission("ADMINISTRATOR") || message.member.hasPermission("BAN_MEMBERS")) {
      var dbguild = bot.guilds.get("417149156193337344");
      var dbchannels = dbguild.channels.filter(m => RegExp("warn-database", "gi").test(m.name));
      var warns = [];
      var warn2clear = args[1];
      if (isNaN(warn2clear)) return message.reply(`Expected number, got ${warn2clear}.`)
      var warningnum = 0;
      var channelloop = 0;
      var messageloop = 0;
      dbchannels.forEach(dbchannel => {
        dbchannel.fetchMessages({ limit: 100 }).then(messages => {
          messages.forEach(msg => {
            if (msg.content.startsWith(`${message.guild.id} ${target.id}`)) {
              warningnum = warningnum+1;
              warns.push(`${msg.id} ${warningnum}`);
            }
            messageloop = messageloop+1;
            if (messageloop == messages.size) {
              messageloop = 0;
              channelloop = channelloop+1;
              if (channelloop == dbchannels.size) {
                if (warningnum == 0) return message.reply("There are no warnings on this user!");
                warns.forEach(warn => {
                  if (warn.substr(19) == warn2clear) {
                    dbchannels.forEach(dbchannel2 => {
                      dbchannel2.fetchMessage(warn.substring(0, 19)).then(msg => {
                        var reason = msg.content.substr(message.guild.id.length+target.id.length+20);
                        var user = bot.users.get(msg.content.substr(38).slice(0, -reason.length));
                        msg.delete();
                        message.reply(`${message.author}, Sucessfully removed warning \`${warn2clear}\`: \`${reason}\` on \`${target.user.username}\` by \`${user.tag}\``);
                      });
                    });
                  }
                });
              }
            }
          });
        });
      });
    } else {
      message.reply("Insufficent permissions.");
    }
  } else {
    message.reply("Please **mention** a valid user.");
  }
}
module.exports.help = {
  name: "removewarn"
}
