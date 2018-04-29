const Discord = require("discord.js");
var google = require('google')
google.resultsPerPage = 3
module.exports.run = async (bot, message, args, prefix, content) => {
       google('args[0]', function (err, res){
  if (err) console.error(err)
 console.log(res)
})
}
module.exports.help = {
        name: "google"
}
