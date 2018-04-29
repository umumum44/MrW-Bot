const Discord = require("discord.js");
var google = require('google')
google.resultsPerPage = 12
module.exports.run = async (bot, message, args, prefix, content) => {
       google(args[0], function (err, res){
  if (err) console.error(err)
             if(!res.links[0]) return message.reply("Couldn't find anything with this search query!")
              var i = 0
              var link;
              while(i <= 10) {
               link = res.links[i]
               if((link.title) && (link.description) && (link.link)) {
                      let embed = Discord.RichEmbed()
                       .setTitle("Result")
                .setColor("#000080")
                .addField("Title", link.title)
                .addField("Link", link.link)
                .addField("Description", link.description)
                .setFooter(`Requested by ${message.author.tag}`);
                      return message.channel.send(embed)
                      }
                     i++
              }
              return message.reply("Couldn't find enough information with this search!")

 

})
}
module.exports.help = {
        name: "google"
}
