const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
    return message.reply(`pong! \`{bot.ping}ms\``);
}

module.exports.help = {
    name: "ping"
}
