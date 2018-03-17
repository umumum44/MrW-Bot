const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
        let guild = bot.guilds.find(`id`, "410400562232819723")
let member = await guild.fetchMember(message.author.id)
if(!member) return;
if  (member.roles.get("410608939139334184") //coowner
 || member.roles.get("410481036162760722")) { //owner 
        let tbh = args.join(" ");
        if (bot.user.presence.game.type === 0) {
                bot.user.setActivity(`${tbh}`, {type: "PLAYING"});
                message.react("\u2705");
        } else if (bot.user.presence.game.type === 1) {
                bot.user.setActivity(`${tbh}`, {type: "STREAMING"});
                message.react("\u2705");
        } else if (bot.user.presence.game.type === -1) {
                bot.user.setActivity(`${tbh}`, {type: "PLAYING"});
                message.react("\u2705");
        } else if (bot.user.presence.game.type === 2) {
                bot.user.setActivity(`${tbh}`, {type: "LISTENING"});
                message.react("\u2705");
        } else if (bot.user.presence.game.type === 3) {
                bot.user.setActivity(`${tbh}`, {type: "WATCHING"});
                message.react("\u2705");
        }
}
}

module.exports.help = {
        name: "setstatus"
}
