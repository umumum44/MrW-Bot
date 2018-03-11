const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
let choice = args[0]
if(!choice) return message.reply("You did not provide your choice!")
	var responses = ["rock", "paper", "scissors"];
	var randomchoice = Math.floor(Math.random() * responses.length);
  if(randomchoice.toLowerCase() === "rock" && choice.toLowerCase() === "paper") {
	message.reply(`I chose **${randomchoice}.** You chose paper. You win!`);
  } else if(randomchoice.toLowerCase() === "rock" && choice.toLowerCase() === "scissors") {
	message.reply(`I chose **${randomchoice}.** You chose scissors. You win!`);
  } else if(randomchoice.toLowerCase() === "paper" && choice.toLowerCase() === "rock") {
	message.reply(`I chose **${randomchoice}.** You chose scissors. You win!`);
  } else if(randomchoice.toLowerCase() === "paper" && choice.toLowerCase() === "scissors") {
	message.reply(`I chose **${randomchoice}.** You chose scissors. You win!`);
  } else if(randomchoice.toLowerCase() === "scissors" && choice.toLowerCase() === "rock") {
	message.reply(`I chose **${randomchoice}.** You chose scissors. You win!`);
  } else if(randomchoice.toLowerCase() === "scissors" && choice.toLowerCase() === "paper") {
	message.reply(`I chose **${randomchoice}.** You chose scissors. You win!`);
  } else if(randomchoice.toLowerCase() === choice.toLowerCase()) {
  let l = choice.toLowerCase()
	message.reply(`I chose **${randomchoice}.** You chose ${l}. It's a tie!`);
  } else return message.reply("You did not provide a valid choice!\nValid Choices: Rock, Paper, Scissors")
  
}
module.exports.help = {
	name: "rps"
}
