const Discord = require("discord.js");
var google = require('google')
google.resultsPerPage = 3
module.exports.run = async (bot, message, args, prefix, content) => {
       google(args[0], function (err, res){
  if (err) console.error(err)
              var linkuno = res.links[0]
              var linkdos = res.links[2]
              var linktres = res.links[3]
if((linkuno) && (linkdos) && (linktres)) {
 message.reply(`**Results:**\nTitle: ${linkuno.title}\nLink: ${linkuno.link}\nDescription: ${linkuno.description}\n-----------------\nTitle: ${linkdos.title}\nLink: ${linkdos.link}\nDescription: ${linkdos.description}\n-----------------\nTitle: ${linktres.title}\nLink: ${linktres.link}\nDescription: ${linktres.description}`)
} else if (linkuno) {
        message.reply(`**Result:**\nTitle: ${linkuno.title}\nLink: ${linkuno.link}\nDescription: ${linkuno.description}`)
} else {
       message.reply("Couldn't find anything with this search query!")
}
})
}
module.exports.help = {
        name: "google"
}
