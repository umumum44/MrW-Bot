const Discord = require("discord.js");
const rbx = require("roblox-js");

async function everything(message, bot ) {
  let target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!target) return message.channel.send("Please **mention** a valid user.");
  var dbguild = bot.guilds.get("417149156193337344");
  var dbchannels = dbguild.channels.filter(m => RegExp("roblox-database", "gi").test(m.name));
  var count = 0;
  message.channel.send("Loading...").then(m => {
    dbchannels.forEach(dbchannel => {
      dbchannel.fetchMessages({ limit: 100 }).then(messages => {
        messages.forEach(async msg => {
          if (msg.content.startsWith(`${target.id}`)) {
            msgargs = msg.content.split(" ").slice(1);
            var userid = msgargs[0];
            var playerinfo = await rbx.getPlayerInfo(userid);
            var joindate = await playerinfo.joinDate.toString().slice(0, -39);
            var friends = await rbx.getFriends(userid, "AllFriends");
            var username = await playerinfo.username;
            m.edit(`**${target.user.tag}'s Roblox Info**\nUsername: \`${username}\`\nUser ID: \`${userid}\`\nFriends: \`${friends.total}/200\`\nJoin Date: \`${joindate}\``)
          }
        });
      });
    });
  });
}

module.exports.run = async (bot, message, args) => {
  everything(message, bot)
}
module.exports.help = {
  name: "getinfo"
}
