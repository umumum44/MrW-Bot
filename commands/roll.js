const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix, content) => {
	if(args[0]) { 
    		let number = Math.floor(Math.random(7));
    		return await message.reply(`You rolled a(n) ${number}!`);
		}
	let num = Number(args[0])
	if(!num) return message.reply("Please provide a valid number!")
  	if(num > 25) return message.reply("You cannot roll more than 25 die at a time!")
	let numbe = num * 6
	let numbea = numbe + 1
	let numero = Math.floor(Math.random() * numbea);
	return await message.reply(`You rolled a(n) ${numero}!`);
		
  
  
}
module.exports.help = {
	name: "roll"
}
