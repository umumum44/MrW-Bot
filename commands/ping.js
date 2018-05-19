const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
       
        message.reply(`pong! \`${Math.floor(bot.pings[0])}ms\``)
                .catch(function () {});
}
module.exports.help = {
        name: "ping"
}
