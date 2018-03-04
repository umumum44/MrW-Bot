const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
if(message.member.hasPermission("BAN_MEMBERS")) {
    let buser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!buser) return message.channel.send(`${message.author}, Please mention a user!`);
    if(buser.hasPermission("BAN_MEMBERS")) return message.channel.send(`${message.author}, this member cannot be banned!`)
    message.guild.member(buser).ban()
    message.react("\u2705")
    } else return message.channel.send(`${message.author}, you do not have permission to kick members!`)
return;
}

module.exports.help = {
    name: "ban"
}
