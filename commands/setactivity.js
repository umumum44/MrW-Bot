const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
let tbh = args.join(" ").toUpperCase()

if(message.author.id === "399975738008141824") {
bot.user.setActivity(`${bot.user.presence.game.name}`, {type: `${tbh}`});
      message.react("\u2705")
}

}

module.exports.help = {
    name: "setactivity"
}
