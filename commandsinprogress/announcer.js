const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, content) => {
let togglechannel
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have permission to use this command!")
        if(args[0] === "toggle") {
          if(args[1] === "true") {
          
          if(args[1] === "false") {
          
}
module.exports.help = {
        name: "announcer"
}
