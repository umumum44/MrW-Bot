const Discord = require("discord.js");
const rbx = require("roblox-js");
const request = require('request-promise');

async function getMembership(username) {
  let response = await request({
    uri: `https://www.roblox.com/Thumbs/BCOverlay.ashx?username=${username}`,
    simple: false,
    resolveWithFullResponse: true
  });
  let url = response.request.uri.href
  if (url.includes('overlay_obcOnly')) {
    return 'OBC'
  } else if (url.includes('overlay_tbcOnly')) {
    return 'TBC';
  } else if (url.includes('overlay_bcOnly')) {
    return 'BC';
  } else {
    return 'NBC';
  }
}

async function everything(args, message, bot ) {
  var target;
  if (args[0] != null) {
    target = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    console.log(args[0])
  } else {
    target = message.guild.members.get(message.author.id);
  }
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
            let response = await request({
              uri: `https://www.roblox.com/Thumbs/BCOverlay.ashx?username=${username}`,
              simple: false,
              resolveWithFullResponse: true
            })
            let url = response.request.uri.href
            membership = 'NBC'
            if (url.includes('overlay_obcOnly')) {
              membership = 'OBC'
            } else if (url.includes('overlay_tbcOnly')) {
              membership = 'TBC'
            } else if (url.includes('overlay_bcOnly')) {
              membership = 'BC'
            }
            m.edit(`**${target.user.tag}'s Roblox Info**\nUsername: \`${username}\`\nUser ID: \`${userid}\`\nFriends: \`${friends.total}/200\`\nMembership: \`${membership}\`\nJoin Date: \`${joindate}\``)
          }
        });
      });
    });
  });
}

module.exports.run = async (bot, message, args) => {
  everything(args, message, bot)
=======
 everything(message, bot)
  //message.reply("soon:tm:")
}
module.exports.help = {
  name: "getinfo"
}
