const Discord = require("discord.js");

module.exports.run = async (bot, message, args, prefix, content) => {
	if(!args[0]) { 
    		let number = Math.floor(Math.random() * (6 - 1)) + 1;
    		return await message.reply(`You rolled ${number}!`);
		}
	let num = Number(args[0])
	if(!num) return message.reply("Please provide a valid number!")
  	if(num > 25) return message.reply("You cannot roll more than 25 die at a time!")
	let max = num * 6
	let min = num
	let numero = Math.floor(Math.random() * (max - num)) + num;
	return await message.reply(`You rolled ${numero}!`);
		
  
  
}
module.exports.help = {
	name: "roll"
}
