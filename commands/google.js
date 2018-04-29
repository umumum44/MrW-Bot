const Discord = require("discord.js");
var google = require('google')
google.resultsPerPage = 3
module.exports.run = async (bot, message, args, prefix, content) => {
       google(args[0], function (err, res){
  if (err) console.error(err)
 message.channel.send(`**Results:**\nTitle: ${res[0].title}\nLink: ${res[0].link}\nDescription: ${res[0].description}\n-----------------\nTitle: ${res[1].title}\nLink: ${res[1].link}\nDescription: ${res[1].description}\n-----------------\nTitle: ${res[2].title}\nLink: ${res[2].link}\nDescription: ${res[2].description}`)
})
}
module.exports.help = {
        name: "google"
}
