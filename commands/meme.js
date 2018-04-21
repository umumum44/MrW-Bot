const getMemeUrls = require('get-meme-urls');
const Discord = require("discord.js");
module.exports.run = async (bot, message, args, prefix, content) => {
let sq = content
if(!sq) return message.reply("You must provide something to search with!")
let ind = Math.floor(Math.random() * 250);
let ps = 25


getMemeUrls(sq, {pageSize: 25, pageIndex: 10000}).then(result => {
  if(!result[0]) {
	  let inde = Math.floor(Math.random() * 10);
	getMemeUrls(sq, {pageSize: 25, pageIndex: inde}).then(resulto => {
		 if(!resulto[0]) {
	  return message.reply("Couldn't find memes with this name!")
 }
		var memeo = result[Math.floor(Math.random() * result.length)];
	message.reply(memeo)
	})
	  
    var meme = result[Math.floor(Math.random() * result.length)];
   /* let memee = new Discord.RichEmbed()
	.setImage(meme)
.setFooter(`Requested by ${message.author.tag}`)
    message.channel.send(memee)*/
	message.reply(meme)
  }).catch(err => {
console.log(err)
 });

}
module.exports.help = {
	name: "meme"
}
