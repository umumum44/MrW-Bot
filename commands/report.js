async function awaitReply(message,question, limit = 300000){
        const filter = m => m.author.id === message.author.id;
        await message.author.send(question);
        try {
                const collected = await message.author.dmChannel.awaitMessages(filter, { max: 1, time: limit, errors: ['time'] });
                return collected.first().content;
        } catch (error) {
                return message.author.send("**Prompt Cancelled -- There Was No Response After Five Minutes**");
        }
}
const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
        message.react("\u2705")
        message.channel.send(`${message.author}, Prompt will continue in DMs! \uD83D\uDCEC`)
   
        const game = await awaitReply(message, "What is the name of the game you are reporting? **BE AS DETAILED AS POSSIBLE!** \nSay **cancel** to cancel prompt.", 300000);
        if(game.toLowerCase() === "cancel") return message.author.send("**Prompt Cancelled**");
        if(game === "**Prompt Cancelled -- There Was No Response After Five Minutes**") return bot.log("ok");
    
        const proof = await awaitReply(message, `Do you have any proof of this bug/glitch? Send **only links** to prove this bug/glitch exists. If you have no proof, say **skip**.\nSay **cancel** to cancel prompt.`, 300000);
        if(proof.toLowerCase() === "cancel") return message.author.send("**Prompt Cancelled**");
        if(proof === "**Prompt Cancelled -- There Was No Response After Five Minutes**") return bot.log("ok");
    
        const describe = await awaitReply(message, "How can you reproduce this bug/glitch? Describe **IN DETAIL**.\nSay **cancel** to cancel prompt.", 300000);
        if(describe.toLowerCase() === "cancel") return message.author.send("**Prompt Cancelled**");
        if(describe === "**Prompt Cancelled -- There Was No Response After Five Minutes**") return bot.log("ok");
    
        const confirm = await awaitReply(message, `**The following information will be sent:**\nGame Name: ${game}\nProof Of Bug/Glitch: ${proof}\nHow To Reproduce This Bug/Glitch: ${describe}\n---------------------------------------\nSay **confirm** to send the report.\nSay **cancel** to cancel the prompt.`, 300000);
        if(confirm.toLowerCase() === "cancel") return message.author.send("**Prompt Cancelled**");
        if(confirm === "**Prompt Cancelled -- There Was No Response After Five Minutes**") return bot.log("ok");
    
        let reportEmbed = new Discord.RichEmbed()
        .setTitle("New Scam Report")
        .setColor("#FF0000")
        .addField("Time Reported", message.createdAt)
        .addField("Reported Game", game)
        .addField("Reporter's Discord Username", message.author)
        .addField("Proof Of Bug/Glitch", proof)
        .addField("How To Reproduce Bug/Glitch", describe);
    
        let reportchannel = message.guild.channels.find(`name`, "reports");
        reportchannel.send(reportEmbed);
        message.author.send("\u2705 **Successfully Submitted! -- Your Response Was Submitted And Will Be Reviewed By Our Staff Shortly!** \u2705");
        return;
}

module.exports.help = {
        name: "report"
}
