const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
        let tbh = args.join(" ");
        if((message.author.id === "399975738008141824") && (bot.user.presence.game.type === 0)) {
                bot.user.setActivity(`${tbh}`, {type: "PLAYING"});
                message.react("\u2705");
        } else if ((message.author.id === "399975738008141824") && (bot.user.presence.game.type === 1)) {
                bot.user.setActivity(`${tbh}`, {type: "STREAMING"});
                message.react("\u2705");
        } else if ((message.author.id === "399975738008141824") && (bot.user.presence.game.type === -1)) {
                bot.user.setActivity(`${tbh}`, {type: "PLAYING"});
                message.react("\u2705");
        } else if ((message.author.id === "399975738008141824") && (bot.user.presence.game.type === 2)) {
                bot.user.setActivity(`${tbh}`, {type: "LISTENING"});
                message.react("\u2705");
        } else if ((message.author.id === "399975738008141824") && (bot.user.presence.game.type === 3)) {
                bot.user.setActivity(`${tbh}`, {type: "WATCHING"});
                message.react("\u2705");
        }
}

module.exports.help = {
        name: "setstatus"
}
