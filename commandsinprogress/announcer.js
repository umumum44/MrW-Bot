const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, content) => {
let togglechannel
        if(!message.member.hasPermission("MANAGE_GUILD")) return message.reply("You don't have permission to use this command!")
        if(args[0] === "toggle") {
           var byeHelloToggle = bot.channels.find(`id`, `438864222537908225`);
                var byeHelloToggleMsgs = await byeHelloToggle.fetchMessages({
                        limit: 100
                });
             var checkToSeeIfOn = byeHelloToggleMsgs.find(m => m.content === message.guild.id);
                if(checkToSeeIfOn) {
                        await message.delete()
                        return message.reply("Successfully Turned Off Join/Leave Messages!")
                } else {
                        await byeHelloToggle.send(message.guild.id)
                        return message.reply("Successfully Turned Off Join/Leave Messages!")
                }
        }
        if(args[0] === "channel") {
                 var byeHelloChannels = bot.channels.find(`id`, `438864035958620171`);
                var byeHelloChannelsMsgs = await byeHelloChannels.fetchMessages({
                        limit: 100
                })
                var channelToSendMsg = byeHelloChannelsMsgs.find(m => m.content.startsWith(message.guild.id));
         if(channelToSendMsg) {
                 await channelToSendMsg.delete()
                 let channelset = message.mentions.channels.first().id
                 if(!channelset) return message.reply("Please **mention** a valid channel!")
                await byeHelloChannels.send(`${message.guild.id} ${channelset}`)
                 await message.reply(`Successfully Set Join/Leave Messages To <#${channelset}>`)
         } if(!channelToSendMsg) {
                 let channelset = message.mentions.channels.first().id
                if(!channelset) return message.reply("Please **mention** a valid channel!")
                await byeHelloChannels.send(`${message.guild.id} ${channelset}`)
                 await message.reply(`Successfully Set Join/Leave Messages To <#${channelset}>`)
       
                

}
module.exports.help = {
        name: "announcer"
}
